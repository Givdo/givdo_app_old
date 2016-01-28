'use strict';

describe('QuizRound', function(){
  var game, player, GameRepo;
  beforeEach(inject(function ($state, _GameRepo_) {
    spyOn($state, 'go');

    GameRepo = _GameRepo_;
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

      expect($state.go).toHaveBeenCalledWith('show-game', {}, {reload: true});
    }));

    it('moves the user to the trivia when player have not finished and user has organization', inject(function ($state, QuizRound) {
      playerState('organization name', false);
      gameState();

      QuizRound.continue(game);

      expect($state.go).toHaveBeenCalledWith('trivia', {}, {reload: true});
    }));

    it('moves the user to select an organization when user does not have one', inject(function ($state, QuizRound) {
      playerState(null, false);
      gameState();

      QuizRound.continue(game);

      expect($state.go).toHaveBeenCalledWith('choose-organization', {}, {reload: true});
    }));
  });

  describe('playFor', function () {
    var deferredPlayFor;
    beforeEach(inject(function (QuizRound, $q) {
      deferredPlayFor = $q.defer();
      spyOn(GameRepo, 'playFor');
      playerState('organization name', false)
      gameState();
      GameRepo.playFor.and.returnValue(deferredPlayFor.promise);

      QuizRound.continue(game);
    }));

    it('moves the state to trivia once player\'s organization is set', inject(function (QuizRound, $state, $rootScope) {
      game.relation.and.returnValue(player);
      $state.go.calls.reset();
      QuizRound.playFor({id: 15});
      deferredPlayFor.resolve(game);
      $rootScope.$digest();

      expect(GameRepo.playFor).toHaveBeenCalledWith(game, {id: 15});
      expect(player.attr).toHaveBeenCalledWith('organization');
    }));
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
    beforeEach(inject(function ($q, $rootScope, QuizRound, GameRepo) {
      wrongOption = {id: 11, attributes: {}}, correctOption = {id: 10, attributes: {}};
      trivia = jasmine.createSpyObj('trivia', ['relation']);
      trivia.relation.and.returnValue([correctOption, wrongOption]);
      answer = jasmine.createSpyObj('answer', ['attr', 'relation']);
      answer.attr.and.returnValue(10);
      answer.relation.and.returnValue(game);

      spyOn(GameRepo, 'answer');
      GameRepo.answer.and.returnValue($q.when(answer));

      gameState(trivia);
      QuizRound.continue(game);
      QuizRound.answer(correctOption);
      $rootScope.$digest();
    }));

    it('answers the current trivia with the given option', inject(function () {
      expect(GameRepo.answer).toHaveBeenCalledWith(game, trivia, correctOption);
    }));

    it('reveals the correct answer', inject(function () {
      expect(wrongOption.attributes.correct).toBeFalsy();
      expect(correctOption.attributes.correct).toBeTruthy();
    }));
  });
});
