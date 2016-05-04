(function () {
  'use strict';

  angular.module('givdo.quiz', ['givdo.api', 'givdo.facebook', 'givdo.util', 'jett.ionic.filter.bar'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('game-history', {
          url: '/game-history',
          parent: 'app',
          views: {
            'quiz-content': {
              templateUrl: 'templates/quiz/game-history.html',
              controller: 'GameHistoryCtrl'
            }
          }
        })
        .state('play', {
          url: '/play',
          parent: 'app',
          views: {
            'quiz-content': {
              templateUrl: 'templates/quiz/new-game.html',
              controller: 'NewGameCtrl'
            }
          }
        })
        .state('challenge', {
          url: '/challenge',
          parent: 'app',
          views: {
            'quiz-content': {
              templateUrl: 'templates/quiz/challenge.html',
              controller: 'ChallengeFriendCtrl'
            }
          }
        })
        .state('show-game', {
          url: '/game',
          parent: 'app',
          views: {
            'quiz-content': {
              templateUrl: 'templates/quiz/show-game.html',
              controller: 'ShowGameCtrl'
            }
          },
          resolve: {
            game: function(QuizRound) { return QuizRound.game(); }
          }
        })
        .state('trivia', {
          url: '/trivia',
          parent: 'app',
          cache: false,
          views: {
            'quiz-content': {
              templateUrl: 'templates/quiz/trivia.html',
              controller: 'TriviaCtrl'
            }
          },
          resolve: {
            trivia: function(QuizRound) { return QuizRound.trivia(); },
            game: function(QuizRound) { return QuizRound.game(); }
          }
        });
    }])

    .directive('gameScore', function() {
      return {
        restrict: 'E',
        scope: {
          game: '=game',
          eventHandler: '&ngClick'
        },
        templateUrl: 'templates/quiz/directives/game-score.html',
        link: function (scope, element) {
          scope.players = scope.game.relation('players');
        }
      };
    })

    .service('QuizRound', ['$state', '$q', 'givdo', 'OrganizationPicker', function ($state, $q, givdo, OrganizationPicker) {
      var currentGame, currentTrivia, currentPlayer;
      var setCurrentGame = function (game) {
        currentGame = game;
        currentTrivia = game.relation('trivia');
        currentPlayer = game.relation('player');
      };
      var revealAnser = function (answer) {
        (currentTrivia.relation('options') || []).forEach(function (option) {
          option.attributes.correct = option.id == answer.attr('correct_option_id');
        });
      };
      var asPromised = function (value) {
        if (value) {
          return $q.resolve(value);
        }
        return $q.reject();
      };
      var savePlayerOrganization = function (organization) {
        return givdo.game.playFor(currentGame, organization);
      };
      var self = {
        trivia: function () {
          return asPromised(currentTrivia);
        },
        game: function () {
          return asPromised(currentGame);
        },
        continue: function (newGame) {
          if (newGame) {
            setCurrentGame(newGame);
          }
          if (currentPlayer.attr('finished?')) {
            $state.go('show-game', {}, {reload: true});
          } else if (currentPlayer.attr('organization')) {
            $state.go('trivia', {}, {reload: true});
          } else {
            OrganizationPicker.open().then(savePlayerOrganization).then(self.continue);
          }
        },
        answer: function (option) {
          return givdo.game.answer(currentGame, currentTrivia, option).then(function (answer) {
            revealAnser(answer);
            setCurrentGame(answer.relation('game'));
            return answer;
          });
        }
      };
      return self;
    }])

      $scope.winner = game.relation('player').attr('winner?');
      $scope.players = game.relation('players');
    .controller('ShowGameCtrl', ['$scope', '$stateParams', 'game', 'facebook', 'givdo', 'QuizRound', function ($scope, $stateParams, game, facebook, givdo, QuizRound) {
      $scope.winner = game.relation('player').attr('winner?');
      $scope.players = game.relation('players');
      $scope.playSingle = function () {
        givdo.game.singlePlayer().then(QuizRound.continue);
      };
    }])

    .controller('NewGameCtrl', ['$scope', 'facebook', 'givdo', 'QuizRound', function ($scope, facebook, givdo, QuizRound) {
      $scope.playSingle = function () {
        givdo.game.singlePlayer().then(QuizRound.continue);
      };
    }])

    .controller('ChallengeFriendCtrl', ['$scope', 'facebook', 'givdo', 'QuizRound', function ($scope, facebook, givdo, QuizRound) {
      givdo.user.friends().then(function (friends) {
        $scope.friends = friends.relation('users');
      });

      $scope.invite = facebook.invite;

      $scope.challenge = function (friend) {
        givdo.game.versus(friend).then(QuizRound.continue);
      };
    }])

    .controller('TriviaCtrl', ['$scope', '$ionicLoading', '$ionicNavBarDelegate', 'QuizRound', 'trivia', 'game', function ($scope, $ionicLoading, $ionicNavBarDelegate, QuizRound, trivia, game) {
      $ionicNavBarDelegate.showBackButton(false);
      $scope.submitAnswer = function () {
        $ionicLoading.show();
        QuizRound.answer($scope.answer.option).then(function () {
          $scope.answer.submitted = true;
          $ionicLoading.hide();
        });
      };
      $scope.answer = {};
      $scope.next = QuizRound.continue;
      $scope.trivia = trivia;
      $scope.options = trivia.relation('options');
      $scope.players = game.relation('players');
    }])

    .controller('GameHistoryCtrl', ['$scope', 'givdo', 'QuizRound', function ($scope, givdo, QuizRound) {
      givdo.game.query().then(function (games) {
        $scope.games = games;
      });
      $scope.openGame = QuizRound.continue;
    }]);
})();
