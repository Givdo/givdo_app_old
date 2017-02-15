import 'angular';

import './views/index.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
  $stateProvider
    .state('notifications', {
      url: '/notifications',
      parent: 'app',
      views: {
        'notifications-content': {
          controller: 'NotificationsController',
          templateUrl: 'notifications/views/index.html',
        }
      },
      data: {
        protected: true,
      }
    });
}

export default routes;
