(function () {
  'use strict';

  angular
    .module('givdo.auth')
    .config(['$httpProvider', configureInterceptors])
    .run(['$rootScope', configureProtectedRoutes]);


  function configureInterceptors($httpProvider) {
    $httpProvider.interceptors.push('sessionInterceptor');
  }

  function configureProtectedRoutes($rootScope) {
    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      // console.log('stateChangeStart');
    });
  }
})();
