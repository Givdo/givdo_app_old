(function () {
  'use strict';

  angular.module('givdo.ui', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('ui', {
        url: '/ui',
        abstract: true,
        templateUrl: 'templates/ui/menu.html'
      })
        .state('profile', {
          url: '/profile',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/profile.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('welcome-ui', {
          url: '/welcome-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/welcome.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('no-guest-ui', {
          url: '/no-guest-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/no-guest.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('notifications-ui', {
          url: '/notifications-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/notifications.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('friends-ui', {
          url: '/friends-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/friends.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('sponsor-ui', {
          url: '/sponsor-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/sponsor.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('activity-ui', {
          url: '/activity-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/activity.html',
              controller: 'ProfileCtrl'
            }
          }
        });
    }])

    .controller('ProfileCtrl', ['$scope', function ($scope) {
    }]);
})();
