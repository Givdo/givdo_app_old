(function () {
  'use strict';

  angular.module('givdo.quiz', ['givdo.api'])
    .config(['$stateProvider', function ($stateProvider) {
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

    .controller("ChooseOrganizationCtrl", ['$scope', '$ionicSlideBoxDelegate', 'Organization', function ($scope, $ionicSlideBoxDelegate, Organization) {
      var perPage = 10;
      var threshold = 3;
      var nextPage = function () {
        return Math.ceil($scope.organizations.length / perPage) + 1;
      };
      var loadNextPage = function () {
        Organization.query({page: nextPage()}, function (organizations) {
          $scope.organizations = $scope.organizations.concat(organizations);
          $ionicSlideBoxDelegate.update();
        });
      };

      $scope.organizations = [];
      $scope.slideChanged = function (position) {
        if ($scope.organizations.length - position < threshold) {
          loadNextPage();
        }
      };

      loadNextPage();
    }]);
})();