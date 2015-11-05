'use strict';

describe('TriviaCtrl', function(){
  var $scope, QuizRound, controller, trivia;
  beforeEach(inject(function($rootScope, $controller, $q){
    $scope = $rootScope.$new();
    trivia = jasmine.createSpyObj('trivia', ['$answer']);
    trivia.$answer.and.returnValue($q.when());

    QuizRound = jasmine.createSpyObj('QuizRound', ['nextTrivia']);
    QuizRound.nextTrivia.and.returnValue(trivia);

    controller = function () {
      var controller = $controller('TriviaCtrl', {$scope: $scope, QuizRound: QuizRound});
      $scope.$digest();
      return controller;
    };
  }));

  describe('initialization', function () {
    it('loads the trivia into the scope', function () {
      controller();

      expect($scope.trivia).toBe(trivia);
    });
  });

  describe('submitAnswer', function () {
    it('posts the answer with the option to the trivia', function () {
      controller();
      $scope.answer.option = 'option';
      $scope.submitAnswer();

      expect(trivia.$answer).toHaveBeenCalledWith('option');
    });

    it('gets the next trivia for the quiz', inject(function ($q) {
      controller();

      var trivia2 = 'trivia 2';
      QuizRound.nextTrivia.and.returnValue(trivia2);

      $scope.submitAnswer();
      $scope.$digest();

      expect($scope.trivia).toBe(trivia2);
    }));
  });
});
