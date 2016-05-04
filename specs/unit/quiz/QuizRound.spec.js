'use strict';

describe('QuizRound', function(){
  var game, player;
  beforeEach(inject(function ($state) {
    spyOn($state, 'go');

    game = jasmine.createSpyObj('current game', ['relation']);
    player = jasmine.createSpyObj('player', ['attr']);

    game.relation.and.returnValue(player);
  }));

  var playerState = function (organization, finished) {
    player.attr.and.callFake(function (attr) {
      if (attr == 'organization') {
        return organization;
      } else if (attr == 'finished?') {
        return finished;
      }
    });
  };
  var gameState = function (trivia) {
    game.relation.and.callFake(function (relation) {
      if (relation == 'trivia') {
        return trivia || {};
      } else if (relation == 'player') {
        return player;
      };
    });
  };

  describe('continue', function () {
    it('moves the user to the game result when the player have finished playing', inject(function ($state, QuizRound) {
      playerState(null, true);
      gameState();

      QuizRound.continue(game);

      expect($state.go).toHaveBeenCalledWith('sponsor', {}, {reload: true});
    }));

    it('moves the user to the trivia when player have not finished and user has organization', inject(function ($state, QuizRound) {
      playerState('organization name', false);
      gameState();

      QuizRound.continue(game);

      expect($state.go).toHaveBeenCalledWith('trivia', {}, {reload: true});
    }));

    describe('when player does not have an organization', function () {
      beforeEach(inject(function (OrganizationPicker, $q) {
        playerState(null, false);
        gameState();

        spyOn(OrganizationPicker, 'open').and.returnValue($q.when('organization'));
      }));

      it('pops up the organization picker', inject(function ($state, QuizRound, OrganizationPicker) {
        QuizRound.continue(game);

        expect(OrganizationPicker.open).toHaveBeenCalled();
      }));

      it('updates the game and continues it', inject(function ($rootScope, QuizRound, givdo) {
        QuizRound.continue(game);
        $rootScope.$digest();

        expect(givdo.game.playFor).toHaveBeenCalledWith(game, 'organization');
      }));

      it('moves the game to the next state', inject(function ($rootScope, QuizRound, givdo) {
        var updatedGame = jasmine.createSpyObj('updated game', ['relation']);
        updatedGame.relation.and.returnValue(jasmine.createSpyObj('player', ['attr']));
        QuizRound.continue(game);

        spyOn(QuizRound, 'continue');
        givdo.game.deferred_playFor.resolve(updatedGame)
        $rootScope.$digest();

        expect(QuizRound.continue).toHaveBeenCalledWith(updatedGame);
      }));
    });
  });

  describe('trivia', function () {
    beforeEach(inject(function (QuizRound) {
      gameState('next trivia');
      QuizRound.continue(game);
    }));

    it('raffles the trivia using the service', inject(function (QuizRound) {
      expect(QuizRound.trivia()).toResolveTo('next trivia');
      expect(game.relation).toHaveBeenCalledWith('trivia');
    }));
  });

  describe('game', function () {
    beforeEach(inject(function (QuizRound) {
      QuizRound.continue(game);
    }));

    it('raffles the trivia using the service', inject(function (QuizRound) {
      expect(QuizRound.game()).toResolveTo(game);
    }));
  });

  describe('answer', function () {
    var wrongOption, correctOption, answer, trivia;
    beforeEach(inject(function ($q, $rootScope, QuizRound, givdo) {
      wrongOption = {id: 11, attributes: {}}, correctOption = {id: 10, attributes: {}};
      trivia = jasmine.createSpyObj('trivia', ['relation']);
      trivia.relation.and.returnValue([correctOption, wrongOption]);
      answer = jasmine.createSpyObj('answer', ['attr', 'relation']);
      answer.attr.and.returnValue(10);
      answer.relation.and.returnValue(game);

      givdo.game.deferred_answer.resolve(answer);

      gameState(trivia);
      QuizRound.continue(game);
      QuizRound.answer(correctOption);
      $rootScope.$digest();
    }));

    it('answers the current trivia with the given option', inject(function (givdo) {
      expect(givdo.game.answer).toHaveBeenCalledWith(game, trivia, correctOption);
    }));

    it('reveals the correct answer', inject(function () {
      expect(wrongOption.attributes.correct).toBeFalsy();
      expect(correctOption.attributes.correct).toBeTruthy();
    }));
  });
});
