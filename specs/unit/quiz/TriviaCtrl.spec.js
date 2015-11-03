'use strict';

describe('TriviaCtrl', function(){
  var $scope, Trivia, controller;
  beforeEach(inject(function($rootScope, $controller){
    $scope = $rootScope.$new();
    Trivia = jasmine.createSpyObj('Trivia', ['get']);

    controller = function (params) {
      var controller = $controller('TriviaCtrl', {$scope: $scope, Trivia: Trivia, $stateParams: params});
      $scope.$digest();
      return controller;
    };
  }));

  describe('initialization', function () {
    it('loads the trivia into the scope', function () {
      Trivia.get.and.returnValue('trivia');

      controller({triviaId: 10});

      expect($scope.trivia).toEqual('trivia');
    });
  });

  describe('submitAnswer', function () {
    it('posts the answer with the option to the trivia', function () {
      var trivia = jasmine.createSpyObj('trivia', ['$answer']);
      Trivia.get.and.returnValue(trivia);

      controller({});
      $scope.answer.option = 'option';
      $scope.submitAnswer();

      expect(trivia.$answer).toHaveBeenCalledWith('option');
    });
  });
});
