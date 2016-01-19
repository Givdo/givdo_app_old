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

    .service('QuizRound', ['$state', 'GameRepo', function ($state, GameRepo) {
      var currentGame, currentOrganization;
      var revealAnser = function (trivia, answer) {
        (trivia.relation('options') || []).forEach(function (option) {
          option.correct = option.id === answer.attr('correct_option_id');
        });
      };
      var play = function (game) {
        currentGame = game;
        var player = game.relation('player');
        if (player && player.attr('organization')) {
          $state.go('trivia');
        } else {
          $state.go('choose-organization');
        }
      };

      return {
        start: play,
        playFor: function (organization) {
          return GameRepo.playFor(currentGame, organization).then(play);
        },
        nextTrivia: function () {
          return currentGame.relation('trivia');
        },
        answer: function (trivia, option) {
          return GameRepo.answer(currentGame, trivia, option).then(function (answer) {
            revealAnser(trivia, answer);
            currentGame = answer.relation('game');
          });
        }
      };
    }])

    .controller('NewGameCtrl', ['$scope', 'facebook', 'GameRepo', 'QuizRound', function ($scope, facebook, GameRepo, QuizRound) {
      $scope.playSingle = function () {
        GameRepo.singlePlayer().then(QuizRound.start);
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
        $scope.answer = {submitted: false};
        $scope.trivia = QuizRound.nextTrivia();
        $scope.options = $scope.trivia.relation('options');
      };
      $scope.next();
    }])

    .controller('ChooseOrganizationCtrl', ['$scope', '$ionicSlideBoxDelegate', 'OrganizationRepo', 'QuizRound', function ($scope, $ionicSlideBoxDelegate, OrganizationRepo, QuizRound) {
      var PerPage = 10, Threshold = 3;
      var nextPage = function () {
        return Math.ceil($scope.organizations.length / PerPage) + 1;
      };
      var loadNextPage = function () {
        OrganizationRepo.query({page: nextPage()}).then(function (organizations) {
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
