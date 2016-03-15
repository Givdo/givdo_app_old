(function () {
  'use strict';

  angular.module('givdo.user', ['givdo.api', 'givdo.auth'])
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
        })
        .state('profile', {
          url: '/profile',
          parent: 'app',
          views: {
            'profile-content': {
              templateUrl: 'templates/user/profile.html',
              controller: 'ProfileCtrl'
            }
          }
        });
    }])

    .controller('ProfileCtrl', ['$scope', 'session', function ($scope, session) {
      session.user().then(function (user) {
        $scope.user = user;
      });
    }])

    .controller('FriendsCtrl', ['$scope', 'givdo', function ($scope, givdo) {
      givdo.user.friends().then(function (friends) {
        $scope.friends = friends.relation('users');
      });
    }]);
})();
