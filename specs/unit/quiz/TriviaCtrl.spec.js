'use strict';

describe('TriviaCtrl', function(){
  var $scope, $ionicLoading, QuizRound, controller;
  beforeEach(inject(function($rootScope, $controller, $q){
    $scope = $rootScope.$new();
    $ionicLoading = jasmine.createSpyObj('$ionicLoading', ['show', 'hide']);

    QuizRound = jasmine.createSpyObj('QuizRound', ['nextTrivia', 'answer']);
    QuizRound.answer.and.returnValue($q.when());
    QuizRound.nextTrivia.and.returnValue('trivia');

    controller = function () {
      var controller = $controller('TriviaCtrl', {$scope: $scope, $ionicLoading: $ionicLoading, QuizRound: QuizRound});
      $scope.$digest();
      return controller;
    };
  }));

  describe('initialization', function () {
    it('loads the trivia into the scope', function () {
      controller();

      expect($scope.trivia).toEqual('trivia');
    });
  });

  describe('submitAnswer', function () {
    it('posts an answer with the option to the Quiz Round', function () {
      controller();

      $scope.trivia = 'trivia';
      $scope.answer.option = 'option';
      $scope.submitAnswer();

      expect(QuizRound.answer).toHaveBeenCalledWith('trivia', 'option');
    });

    it('shows/hide the loading', function () {
      controller();

      $scope.submitAnswer();
      expect($ionicLoading.show).toHaveBeenCalled();

      $scope.$digest();

      expect($ionicLoading.hide).toHaveBeenCalled();
      expect($scope.answer.answered).toBeTruthy();
    });
  });

  describe('next', function () {
    it('loads the next trivia', function () {
      controller();
      QuizRound.nextTrivia.and.returnValue('trivia 2');

      $scope.next();

      expect($scope.trivia).toEqual('trivia 2');
    });

    it('it resets the answer object to not answered', function () {
      controller();

      $scope.answer = {something: 'really', different: true};
      $scope.next();

      expect($scope.answer).toEqual({answered: false});
    });
  });
});
