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
        .state('show-game', {
          url: '/game',
          parent: 'quiz',
          views: {
            'content': {
              templateUrl: 'templates/quiz/show-game.html',
              controller: 'ShowGameCtrl'
            }
          },
          resolve: {
            game: function(QuizRound) {
              return QuizRound.game();
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
          },
          resolve: {
            trivia: function(QuizRound) {
              return QuizRound.trivia();
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
          },
          resolve: {
            game: function(QuizRound) {
              return QuizRound.game();
            }
          }
        });
    }])

    .service('QuizRound', ['$state', '$q', 'GameRepo', function ($state, $q, GameRepo) {
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
            $state.go('show-game', {}, { reload: true });
          } else if (currentPlayer.attr('organization')) {
            $state.go('trivia', {}, { reload: true });
          } else {
            $state.go('choose-organization', {}, { reload: true });
          }
        },
        playFor: function (organization) {
          return GameRepo.playFor(currentGame, organization);
        },
        answer: function (option) {
          return GameRepo.answer(currentGame, currentTrivia, option).then(function (answer) {
            revealAnser(answer);
            setCurrentGame(answer.relation('game'));
            return answer;
          });
        }
      };

      return self;
    }])

    .controller('ShowGameCtrl', ['$scope', '$stateParams', 'game', function ($scope, $stateParams, game) {
      $scope.player = game.relation('player');
      $scope.players = game.relation('players');
    }])

    .controller('NewGameCtrl', ['$scope', 'facebook', 'GameRepo', 'QuizRound', function ($scope, facebook, GameRepo, QuizRound) {
      $scope.playSingle = function () {
        GameRepo.singlePlayer().then(QuizRound.continue);
      };
      $scope.inviteFriends = function () {
        facebook.gameInvite('Come play with me for a fairer world!')
          .then(QuizRound.continue);
      };
    }])

    .controller('TriviaCtrl', ['$scope', '$ionicLoading', 'QuizRound', 'trivia', function ($scope, $ionicLoading, QuizRound, trivia) {
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
