import 'angular';

import './views/index.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
  $stateProvider
    .state('activities', {
      parent: 'app',
      url: '/activities',
      views: {
        'activity-content': {
          controller: 'ActivitiesController as vm',
          templateUrl: 'activities/views/index.html',
        },
      },
      data: { protected: true },
      resolve: {
        feed: function(givdo) {
          return givdo.user.activities();
        }
      }
    });
}

export default routes;
