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
      var revealAnser = function (trivia, answer) {
        (trivia.options || []).forEach(function (option) {
          option.correct = option.id === answer.correct_option_id;
        });
      };

      return {
        playFor: function (organization) {
          playingForOrganization = organization;
        },
        nextTrivia: function () {
          return Trivia.raffle();
        },
        answer: function (trivia, option) {
          return trivia.$answer(option).then(function (answer) {
            revealAnser(trivia, answer);
          });
        }
      };
    }])

    .controller('TriviaCtrl', ['$scope', '$ionicLoading', 'QuizRound', function ($scope, $ionicLoading, QuizRound) {
      $scope.submitAnswer = function () {
        $ionicLoading.show();
        QuizRound.answer($scope.trivia, $scope.answer.option).then(function () {
          $scope.answer.submitted = true;
          $ionicLoading.hide();
        });
      };
      $scope.next = function () {
        $scope.trivia = QuizRound.nextTrivia();
        $scope.answer = {submitted: false};
      };
      $scope.next();
    }])

    .controller("ChooseOrganizationCtrl", ['$scope', '$ionicSlideBoxDelegate', '$state', 'Organization', 'QuizRound', function ($scope, $ionicSlideBoxDelegate, $state, Organization, QuizRound) {
      var PerPage = 10, Threshold = 3;
      var nextPage = function () {
        return Math.ceil($scope.organizations.length / PerPage) + 1;
      };
      var loadNextPage = function () {
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