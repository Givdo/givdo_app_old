'use strict';

describe('QuizRound', function(){
  describe('nextTrivia', function () {
    it('raffles the trivia using the service', inject(function (Trivia, QuizRound) {
      spyOn(Trivia, 'raffle').and.returnValue('trivia');

      expect(QuizRound.nextTrivia()).toEqual('trivia');
    }));
  });
});
