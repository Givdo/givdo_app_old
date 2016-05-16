(function () {
  'use strict';

  angular
    .module('givdo.session', [])
    .service(Session);


    Session.$inject = ['localStorageServiceProvider'];

    function Session(localStorage) {
      var service = {
        
      };

      return service;

      localStorage.setPrefix('givdo');
    }
})();
