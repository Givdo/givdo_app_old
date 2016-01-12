'use strict';

describe('QuizRound', function(){
  var game;
  beforeEach(inject(function ($state, QuizRound) {
    spyOn($state, 'go');

    game = jasmine.createSpyObj('current game', ['$answer', '$raffle', '$playFor']);
  }));

  describe('playFor', function () {
    beforeEach(inject(function (QuizRound, $q) {
      game.$playFor.and.returnValue({$promise: $q.when(game)});
      QuizRound.start(game);
    }));

    it('moves the state to trivia once player\'s organization is set', inject(function (QuizRound, $state, $rootScope) {
      game.player = {organization: 'Children and Clowns'}

      $state.go.calls.reset();
      QuizRound.playFor({id: 15});
      $rootScope.$digest();

      expect(game.$playFor).toHaveBeenCalledWith({id: 15});
      expect($state.go).toHaveBeenCalledWith('trivia');
    }));
  });

  describe('start', function () {
    it('moves the state to choose the organization when no player organization is set', inject(function (QuizRound, $state) {
      QuizRound.start({});

      expect($state.go).toHaveBeenCalledWith('choose-organization');
    }));

    it('moves the state to play trivia when a player\'s organization is set', inject(function (QuizRound, $state) {
      QuizRound.start({player: {organization: 'Save the Passionfruit Tree'}});

      expect($state.go).toHaveBeenCalledWith('trivia');
    }));
  });

  describe('nextTrivia', function () {
    beforeEach(inject(function (QuizRound) {
      QuizRound.start(game);
    }));

    it('raffles the trivia using the service', inject(function (QuizRound, $q) {
      game.$raffle.and.returnValue({$promise: $q.when('trivia')});

      expect(QuizRound.nextTrivia()).toResolveTo('trivia');
    }));
  });

  describe('answer', function () {
    var wrongOption, correctOption, answer, trivia;
    beforeEach(inject(function ($q, $rootScope, QuizRound) {
      wrongOption = {id: 11}, correctOption = {id: 10}, answer = {correct_option_id: 10};
      trivia = {options: [correctOption, wrongOption]};
      game.$answer.and.returnValue({$promise: $q.when(answer)})

      QuizRound.start(game);
      QuizRound.answer(trivia, correctOption);
      $rootScope.$digest();
    }));

    it('answers the trivia with the given option', inject(function () {
      expect(game.$answer).toHaveBeenCalledWith(trivia, correctOption);
    }));

    it('reveals the correct answer', inject(function () {
      expect(wrongOption.correct).toBeFalsy();
      expect(correctOption.correct).toBeTruthy();
    }));
  });
});
