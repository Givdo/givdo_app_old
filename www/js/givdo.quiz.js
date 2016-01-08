(function () {
  'use strict';

  angular.module('givdo.quiz', ['givdo.api', 'givdo.facebook'])
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
        .state('play', {
          url: '/play',
          parent: 'quiz',
          views: {
            'content': {
              templateUrl: 'templates/quiz/new-game.html',
              controller: 'NewGameCtrl'
            }
          }
        })
        .state('trivia', {
          url: '/trivia',
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

    .service('QuizRound', ['$state', function ($state) {
      var currentGame, currentOrganization;
      var revealAnser = function (trivia, answer) {
        (trivia.options || []).forEach(function (option) {
          option.correct = option.id === answer.correct_option_id;
        });
      };

      return {
        start: function (game) {
          currentGame = game;
          $state.go('choose-organization');
        },
        playFor: function (organization) {
          currentOrganization = organization;
          $state.go('trivia');
        },
        nextTrivia: function () {
          return currentGame.$raffle();
        },
        answer: function (trivia, option) {
          return currentGame.$answer(trivia, option).then(function (answer) {
            revealAnser(trivia, answer);
          });
        }
      };
    }])

    .controller('NewGameCtrl', ['$scope', 'facebook', 'Game', 'QuizRound', function ($scope, facebook, Game, QuizRound) {
      $scope.playSingle = function () {
        Game.single(QuizRound.start);
      };
      $scope.inviteFriends = function () {
        facebook.gameInvite('Come play with me for a fairer world!')
          .then(QuizRound.start);
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
        QuizRound.nextTrivia().then(function (trivia) {
          $scope.trivia = trivia;
        });
        $scope.answer = {submitted: false};
      };
      $scope.next();
    }])

    .controller('ChooseOrganizationCtrl', ['$scope', '$ionicSlideBoxDelegate', 'Organization', 'QuizRound', function ($scope, $ionicSlideBoxDelegate, Organization, QuizRound) {
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
      };

      $scope.organizations = [];
      loadNextPage();
    }]);
})();
