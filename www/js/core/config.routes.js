(function () {
  'use strict';

  var core = angular.module('givdo.core');


  core.run(['$rootScope', configureProtectedRoutes]);

  function configureProtectedRoutes($rootScope) {
    console.log('givdo.core configureProtectedRoutes');

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      console.log('stateChangeStart');
    });
  }
})();
