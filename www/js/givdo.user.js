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

    .controller('FriendsCtrl', ['$scope', 'givdo', function ($scope, givdo) {
      givdo.user.friends().then(function (friends) {
        $scope.friends = friends.relation('users');
      });
    }]);
})();
