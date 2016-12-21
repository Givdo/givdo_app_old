(function() {
  'use strict';

  angular
    .module('givdo.profile')
    .config(['$stateProvider', config]);

    function config($stateProvider) {
      $stateProvider.state('foo', {});
    }
})();
