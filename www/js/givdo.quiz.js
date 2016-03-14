(function () {
  'use strict';

  angular.module('givdo.quiz', ['givdo.api', 'givdo.facebook', 'jett.ionic.filter.bar'])
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
        })
        .state('choose-organization', {
          url: '/choose-organization',
          parent: 'app',
          views: {
            'quiz-content': {
              templateUrl: 'templates/quiz/choose-organization.html',
              controller: 'ChooseOrganizationCtrl'
            }
          },
          resolve: {
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

    .service('QuizRound', ['$state', '$q', 'givdo', function ($state, $q, givdo) {
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
            $state.go('show-game', {}, {reload: true});
          } else if (currentPlayer.attr('organization')) {
            $state.go('trivia', {}, {reload: true});
          } else {
            $state.go('choose-organization', {}, {reload: true});
          }
        },
        playFor: function (organization) {
          return givdo.game.playFor(currentGame, organization);
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

    .controller('ShowGameCtrl', ['$scope', '$stateParams', 'game', function ($scope, $stateParams, game) {
      $scope.winner = game.relation('player').attr('winner?');
      $scope.players = game.relation('players');
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
    }])

    .controller('ChooseOrganizationCtrl', ['$scope', '$ionicSlideBoxDelegate', 'givdo', 'QuizRound', '$ionicFilterBar', function ($scope, $ionicSlideBoxDelegate, givdo, QuizRound, $ionicFilterBar) {
      var Threshold = 3;
      var page;

      var loadOrganizations = function (organizations) {
        page = organizations;
        $scope.organizations = $scope.organizations.concat(organizations);
        $ionicSlideBoxDelegate.update();
      };
      var search = function (searchText) {
        var params = searchText ? {search: {name_cont: searchText}} : {};
        givdo.organizations.query(params).then(function (organizations) {
          $scope.organizations = [];
          loadOrganizations(organizations);
        });
      };
      search();

      $scope.searchOrganization = function () {
        $ionicFilterBar.show({debounce: true, search: search});
      };
      $scope.slideChanged = function (position) {
        if ($scope.organizations.length - position == Threshold) {
          page.next().then(loadOrganizations);
        }
      };
      $scope.selectOrganization = function () {
        var index = $ionicSlideBoxDelegate.currentIndex();
        var organization = $scope.organizations[index];

        QuizRound.playFor(organization).then(QuizRound.continue);
      };
    }]);
})();
