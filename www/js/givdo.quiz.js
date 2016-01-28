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
      var currentGame, currentTrivia, currentPlayer;
      var revealAnser = function (answer) {
        (currentTrivia.relation('options') || []).forEach(function (option) {
          option.attributes.correct = option.id == answer.attr('correct_option_id');
        });
      };
      var setCurrentGame = function (game) {
        currentGame = game;
        currentTrivia = game.relation('trivia');
        currentPlayer = game.relation('player');
      };
      var startGame = function(game) {
        setCurrentGame(game);
        continueGame();
      };
      var continueGame = function () {
        if (currentPlayer.attr('finished?')) {
          $state.go('result', {}, { reload: true });
        } else if (currentPlayer.attr('organization')) {
          $state.go('trivia', {}, { reload: true });
        } else {
          $state.go('choose-organization', {}, { reload: true });
        }
      };
      var trivia = function () {
        return currentTrivia;
      };

      return {
        continue: continueGame,
        start: startGame,
        playFor: function (organization) {
          return GameRepo.playFor(currentGame, organization).then(startGame);
        },
        trivia: trivia,
        answer: function (option) {
          return GameRepo.answer(currentGame, currentTrivia, option).then(function (answer) {
            revealAnser(answer);
            setCurrentGame(answer.relation('game'));
            return answer;
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
        QuizRound.answer($scope.answer.option).then(function (answer) {
          $scope.answer.submitted = true;
          $ionicLoading.hide();
        });
      };
      $scope.answer = {};
      $scope.next = QuizRound.continue;
      $scope.trivia = QuizRound.trivia();
      $scope.options = $scope.trivia.relation('options');
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

        QuizRound.playFor(organization).then(QuizRound.continue);
      };

      $scope.organizations = [];
      loadNextPage();
    }]);
})();
