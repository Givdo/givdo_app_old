(function () {
  'use strict';

  angular
    .module('givdo.ui', [])
    .config(['$stateProvider', config]);


    function config($stateProvider) {
      $stateProvider.state('ui', {
        url: '/ui',
        abstract: true,
        templateUrl: 'templates/ui/menu.html'
      })
        .state('welcome-ui', {
          url: '/welcome-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/welcome.html'
            }
          }
        })
        .state('no-guest-ui', {
          url: '/no-guest-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/no-guest.html'
            }
          }
        })
        .state('notifications-ui', {
          url: '/notifications-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/notifications.html'
            }
          }
        })
        .state('sponsor-ui', {
          url: '/sponsor-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/sponsor.html'
            }
          }
        })
        .state('activity-ui', {
          url: '/activity-ui',
          parent: 'ui',
          views: {
            'content': {
              templateUrl: 'templates/ui/activity.html'
            }
          }
        });
    }
})();
