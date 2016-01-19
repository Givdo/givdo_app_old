'use strict';

describe('QuizRound', function(){
  var game, player, GameRepo;
  beforeEach(inject(function ($state, QuizRound, _GameRepo_) {
    spyOn($state, 'go');

    GameRepo = _GameRepo_;
    game = jasmine.createSpyObj('current game', ['relation']);
    player = jasmine.createSpyObj('player', ['attr']);

    game.relation.and.returnValue(player);
  }));

  describe('playFor', function () {
    var deferredPlayFor;
    beforeEach(inject(function (QuizRound, $q) {
      deferredPlayFor = $q.defer();
      spyOn(GameRepo, 'playFor');
      GameRepo.playFor.and.returnValue(deferredPlayFor.promise);

      QuizRound.start(game);
    }));

    it('moves the state to trivia once player\'s organization is set', inject(function (QuizRound, $state, $rootScope) {
      player.attr.and.returnValue('organization name');
      game.relation.and.returnValue(player);
      $state.go.calls.reset();
      QuizRound.playFor({id: 15});
      deferredPlayFor.resolve(game);
      $rootScope.$digest();

      expect(GameRepo.playFor).toHaveBeenCalledWith(game, {id: 15});
      expect(player.attr).toHaveBeenCalledWith('organization');
      expect($state.go).toHaveBeenCalledWith('trivia');
    }));
  });

  describe('start', function () {
    it('moves the state to choose the organization when no player organization is set', inject(function (QuizRound, $state) {
      player.attr.and.returnValue(undefined);

      QuizRound.start(game);

      expect($state.go).toHaveBeenCalledWith('choose-organization');
    }));

    it('moves the state to play trivia when a player\'s organization is set', inject(function (QuizRound, $state) {
      player.attr.and.returnValue('organization name');

      QuizRound.start(game);

      expect($state.go).toHaveBeenCalledWith('trivia');
    }));
  });

  describe('nextTrivia', function () {
    beforeEach(inject(function (QuizRound) {
      QuizRound.start(game);
    }));

    it('raffles the trivia using the service', inject(function (QuizRound, $q) {
      game.relation.and.returnValue('next trivia');

      expect(QuizRound.nextTrivia()).toEqual('next trivia');
      expect(game.relation).toHaveBeenCalledWith('trivia');
    }));
  });

  describe('answer', function () {
    var wrongOption, correctOption, answer, trivia;
    beforeEach(inject(function ($q, $rootScope, QuizRound, GameRepo) {
      wrongOption = {id: 11}, correctOption = {id: 10};
      answer = jasmine.createSpyObj('answer', ['attr', 'relation']);
      answer.attr.and.returnValue(10);
      trivia = jasmine.createSpyObj('trivia', ['relation']);
      trivia.relation.and.returnValue([correctOption, wrongOption]);
      spyOn(GameRepo, 'answer');
      GameRepo.answer.and.returnValue($q.when(answer))

      QuizRound.start(game);
      QuizRound.answer(trivia, correctOption);
      $rootScope.$digest();
    }));

    it('answers the trivia with the given option', inject(function () {
      expect(GameRepo.answer).toHaveBeenCalledWith(game, trivia, correctOption);
    }));

    it('reveals the correct answer', inject(function () {
      expect(wrongOption.correct).toBeFalsy();
      expect(correctOption.correct).toBeTruthy();
    }));
  });
});
