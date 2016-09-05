(function() {
  'use strict';

  angular
    .module('givdo.notifications')
    .config(['$stateProvider', config]);

    function config($stateProvider) {
      $stateProvider
        .state('notifications', {
          url: '/notifications',
          parent: 'app',
          views: {
            'notifications-content': {
              controller: 'NotificationsController',
              templateUrl: 'templates/notifications/index.html',
            }
          },
          data: {
            protected: true,
          }
        });
    }
})();
