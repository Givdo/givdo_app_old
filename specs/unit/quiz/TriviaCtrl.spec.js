'use strict';

describe('TriviaCtrl', function(){
  var $scope, $ionicLoading, QuizRound, trivia, game, controller;
  beforeEach(inject(function($rootScope, $controller, $q){
    $scope = $rootScope.$new();
    trivia = jasmine.createSpyObj('trivia', ['relation']);
    game = jasmine.createSpyObj('game', ['relation']);
    $ionicLoading = jasmine.createSpyObj('$ionicLoading', ['show', 'hide']);

    QuizRound = jasmine.createSpyObj('QuizRound', ['answer', 'continue']);
    QuizRound.answer.and.returnValue($q.when());

    controller = function () {
      var controller = $controller('TriviaCtrl', {$scope: $scope, $ionicLoading: $ionicLoading, QuizRound: QuizRound, trivia: trivia, game: game});
      $scope.$digest();
      return controller;
    };
  }));

  describe('initialization', function () {
    it('loads the trivia into the scope', function () {
      controller();

      expect($scope.trivia).toBe(trivia);
    });

    it('loads the trivia options into the scope', function () {
      trivia.relation.and.returnValue(['option 1', 'option 2']);

      controller();

      expect($scope.options).toEqual(['option 1', 'option 2']);
    });
  });

  describe('submitAnswer', function () {
    it('posts an answer with the option to the Quiz Round', function () {
      controller();

      $scope.answer.option = 'option';
      $scope.submitAnswer();

      expect(QuizRound.answer).toHaveBeenCalledWith('option');
    });

    it('shows/hide the loading', function () {
      controller();

      $scope.submitAnswer();
      expect($ionicLoading.show).toHaveBeenCalled();

      $scope.$digest();

      expect($ionicLoading.hide).toHaveBeenCalled();
      expect($scope.answer.submitted).toBeTruthy();
    });
  });

  describe('next', function () {
    it('continues the quiz round', inject(function ($q, $rootScope) {
      controller();

      $scope.next();

      expect(QuizRound.continue).toHaveBeenCalled();
    }));
  });
});
