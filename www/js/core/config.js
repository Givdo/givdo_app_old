(function () {
  'use strict';

  angular
    .module('givdo.core')
    .config(['$httpProvider', configureSerializer])
    .config(['$httpProvider', 'localStorageServiceProvider', configureInterceptors]);


  function configureSerializer($httpProvider) {
    console.log('givdo.core configureSerializer');
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  }

  function configureInterceptors($httpProvider, localStorage) {
    console.log('givdo.core configureInterceptors');

    $httpProvider.interceptors.push('sessionInterceptor');
  }
})();
