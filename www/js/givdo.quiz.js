(function () {
  'use strict';

  angular.module('givdo.quiz', ['givdo.api'])

    .controller('TriviaCtrl', ['$scope', '$stateParams', 'Trivia', function ($scope, $params, Trivia) {
      $scope.trivia = Trivia.get({triviaId: $params.triviaId});
      $scope.answer = {};
      $scope.submitAnswer = function () {
        $scope.trivia.$answer($scope.answer.option);
      };
    }]);
})();