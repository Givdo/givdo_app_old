(function () {
  'use strict';

  angular
    .module('givdo.auth')
    .config(['$httpProvider', configureInterceptors])
    .run(['$rootScope', '$state', configureProtectedRoutes]);


  function configureInterceptors($httpProvider) {
    $httpProvider.interceptors.push('sessionInterceptor');
  }

  function configureProtectedRoutes($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      var data = toState.data || {};
      var protectedRoute = data['protected'] || false;

      if (protectedRoute && $rootScope.currentUser === undefined) {
        event.preventDefault();
        $state.go('welcome');
      }
    });
  }
})();
