'use strict';

describe('QuizRound', function(){
  describe('nextTrivia', function () {
    it('raffles the trivia using the service', inject(function (Trivia, QuizRound) {
      spyOn(Trivia, 'raffle').and.returnValue('trivia');
      expect(QuizRound.nextTrivia()).toBe('trivia');
    }));
  });

  describe('answer', function () {
    var wrongOption, correctOption, answer, trivia, game;
    beforeEach(inject(function ($q, $rootScope, QuizRound) {
      wrongOption = {id: 11}, correctOption = {id: 10}, answer = {correct_option_id: 10};
      trivia = {options: [correctOption, wrongOption]};
      game = {
        $answer: jasmine.createSpy().and.returnValue($q.when(answer))
      }
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
