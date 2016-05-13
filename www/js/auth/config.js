(function () {
  'use strict';

  angular
    .module('givdo.auth')
    .config(['$httpProvider', configureInterceptors])
    .run(['$rootScope', configureProtectedRoutes]);


  function configureInterceptors($httpProvider) {
    // console.log('givdo.core configureInterceptors');

    $httpProvider.interceptors.push('sessionInterceptor');
  }

  function configureProtectedRoutes($rootScope) {
    // console.log('givdo.core configureProtectedRoutes');

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      // console.log('stateChangeStart');
    });
  }
})();
