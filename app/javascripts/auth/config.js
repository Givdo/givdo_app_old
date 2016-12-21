(function () {
  'use strict';

  angular
    .module('givdo.auth')
    .config(['$httpProvider', configureInterceptors])
    .run(['$rootScope', '$state', 'events', 'sessionService', configureProtectedRoutes]);


  function configureInterceptors($httpProvider) {
    $httpProvider.interceptors.push('sessionInterceptor');
  }

  function configureProtectedRoutes($rootScope, $state, events, sessionService) {
    $rootScope.$on(events.SESSION_DOWN, function(event) {
      console.info('session down');

      event.preventDefault();
      $state.go('welcome');
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var data = toState.data || {};
      var token = sessionService.getToken();
      var protectedRoute = data['protected'] || true;

      if(!token && protectedRoute && toState.name !== 'welcome') {
        event.preventDefault();
        $state.go('welcome');
      }
    });
  }
})();
