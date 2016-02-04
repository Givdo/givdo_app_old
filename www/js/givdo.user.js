(function () {
  'use strict';

  angular.module('givdo.user', ['givdo.api'])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider
        .state('friends', {
          url: '/friends',
          parent: 'app',
          views: {
            'menuContent': {
              templateUrl: 'templates/user/friends.html',
              controller: 'FriendsCtrl'
            }
          }
        });
    }])

    .controller('FriendsCtrl', ['$scope', 'UserRepo', function ($scope, UserRepo) {
      UserRepo.friends().then(function (friends) {
        $scope.friends = friends.relation('users');
      });
    }]);
})();
