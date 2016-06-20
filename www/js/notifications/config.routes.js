(function() {
  'use strict';

  angular
    .module('givdo.notifications')
    .config(['$stateProvider', config]);

    function config($stateProvider) {
      $stateProvider
        .state('notification', {
          url: '/notification',
          parent: 'app',
          views: {
            'notification-content': {
              controller: 'NotificationsController',
              templateUrl: 'templates/user/notification.html',
            }
          },
          data: {
            protected: true,
          }
        });
    }
})();
