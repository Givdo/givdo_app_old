(function () {
  'use strict';

  angular.module('givdo.user', ['givdo.api', 'givdo.quiz'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('friends', {
          url: '/friends',
          parent: 'app',
          views: {
            'friends-content': {
              templateUrl: 'templates/user/friends.html',
              controller: 'FriendsCtrl'
            }
          }
        });
    }])

    .controller('FriendsCtrl', ['$scope', 'UserRepo', 'GameRepo', 'QuizRound', function ($scope, UserRepo, GameRepo, QuizRound) {
      UserRepo.friends().then(function (friends) {
        $scope.friends = friends.relation('users');
      });

      $scope.challenge = function (friend) {
        GameRepo.create({
          provider: friend.attr('provider'),
          invitees: [friend.attr('uid')]
        }).then(QuizRound.continue);
      };
    }]);
})();
