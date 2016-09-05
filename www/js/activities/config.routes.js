(function() {
  'use strict';

  angular
    .module('givdo.activities')
    .config(['$stateProvider', config]);


    function config($stateProvider) {
      $stateProvider
        .state('activities', {
          parent: 'app',
          url: '/activities',
          views: {
            'activity-content': {
              controller: 'ActivitiesController as vm',
              templateUrl: 'templates/activities/index.html',
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
})();
