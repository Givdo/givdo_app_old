'use strict';

describe('QuizRound', function(){
  describe('nextTrivia', function () {
    it('raffles the trivia using the service', inject(function (Trivia, QuizRound) {
      spyOn(Trivia, 'raffle').and.returnValue('trivia');
      expect(QuizRound.nextTrivia()).toBe('trivia');
    }));
  });

  describe('answer', function () {
    it('reveals the correct answer', inject(function (Trivia, QuizRound, $rootScope, $q) {
      var wrongOption = {id: 11}, correctOption = {id: 10}, answer = {correct_option_id: 10};
      var trivia = {
        options: [correctOption, wrongOption],
        $answer: jasmine.createSpy().and.returnValue($q.when(answer))
      };

      QuizRound.answer(trivia, null);
      $rootScope.$digest();

      expect(wrongOption.correct).toBeFalsy();
      expect(correctOption.correct).toBeTruthy();
    }));
  });
});
