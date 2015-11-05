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

    .service('QuizRound', ['Trivia', function (Trivia) {
      var playingForOrganization = null;

      return {
        playFor: function (organization) {
          playingForOrganization = organization;
        },
        nextTrivia: function () {
          return Trivia.raffle();
        }
      };
    }])

    .controller('TriviaCtrl', ['$scope', '$stateParams', 'QuizRound', function ($scope, $params, QuizRound) {
      $scope.trivia = QuizRound.nextTrivia();
      $scope.answer = {};
      $scope.submitAnswer = function () {
        $scope.trivia.$answer($scope.answer.option).then(function () {
          $scope.trivia = QuizRound.nextTrivia();
        });
      };
    }])

    .controller("ChooseOrganizationCtrl", ['$scope', '$ionicSlideBoxDelegate', '$state', 'Organization', 'QuizRound', function ($scope, $ionicSlideBoxDelegate, $state, Organization, QuizRound) {
      var PerPage = 10,
        Threshold = 3,
        nextPage = function () {
          return Math.ceil($scope.organizations.length / PerPage) + 1;
        },
        loadNextPage = function () {
          Organization.query({page: nextPage()}, function (organizations) {
            $scope.organizations = $scope.organizations.concat(organizations);
            $ionicSlideBoxDelegate.update();
          });
        };

      $scope.slideChanged = function (position) {
        if ($scope.organizations.length - position < Threshold) {
          loadNextPage();
        }
      };
      $scope.selectOrganization = function () {
        var currentOrganization = $ionicSlideBoxDelegate.currentIndex();
        var organization = $scope.organizations[currentOrganization];

        QuizRound.playFor(organization);
        $state.go('trivia');
      };

      $scope.organizations = [];
      loadNextPage();
    }]);
})();