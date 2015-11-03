(function () {
  'use strict';

  angular.module('givdo.quiz', ['givdo.api'])
    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('quiz', {
        url: '/quiz',
        abstract: true,
        parent: 'app',
        views: {
          'menuContent': {
            templateUrl: 'templates/quiz/layout.html'
          }
        }
      })
      .state('trivia', {
        url: '/trivia/:triviaId',
        parent: 'quiz',
        views: {
          'content': {
            templateUrl: 'templates/quiz/trivia.html',
            controller: 'TriviaCtrl'
          }
        }
      })
      .state('choose-organization', {
        url: '/choose-organization',
        parent: 'quiz',
        views: {
          'content': {
            templateUrl: 'templates/quiz/choose-organization.html',
            controller: 'ChooseOrganizationCtrl'
          }
        }
      });
    }])

    .controller('TriviaCtrl', ['$scope', '$stateParams', 'Trivia', function ($scope, $params, Trivia) {
      $scope.trivia = Trivia.get({triviaId: $params.triviaId});
      $scope.answer = {};
      $scope.submitAnswer = function () {
        $scope.trivia.$answer($scope.answer.option);
      };
    }])

    .controller("ChooseOrganizationCtrl", ['$scope', 'Organization', function ($scope, Organization) {
      $scope.cards = Organization.query();

      $scope.leftSwipe = function (index) {
      };

      $scope.rightSwipe = function (index) {
      };
    }]);
})();