(function () {
  'use strict';

  angular.module('givdo.quiz', ['givdo.api', 'checklist-model'])

    .controller('TriviaCtrl', ['$scope', '$stateParams', 'Trivia', function ($scope, $params, Trivia) {
      $scope.trivia = Trivia.get({triviaId: $params.triviaId});
      $scope.selectedOptions = [];
    }]);
})();