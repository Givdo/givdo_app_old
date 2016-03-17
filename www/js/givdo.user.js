(function () {
  'use strict';

  angular.module('givdo.user', ['givdo.api', 'givdo.auth', 'givdo.util'])
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

    .controller('ProfileCtrl', ['$scope', 'session', 'givdo', 'OrganizationPicker', function ($scope, session, givdo, OrganizationPicker) {
      var setUser = function (user) {
        $scope.user = user;
        $scope.organization = user.relation('organization');
      };
      session.user().then(setUser);

      $scope.changeOrganization = function () {
        OrganizationPicker.open($scope.organization).then(function (organization) {
          return givdo.user.update($scope.user, {organization_id: organization.id});
        }).then(setUser);
      };
    }])

    .controller('FriendsCtrl', ['$scope', 'givdo', function ($scope, givdo) {
      givdo.user.friends().then(function (friends) {
        $scope.friends = friends.relation('users');
      });
    }]);
})();
