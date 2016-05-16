(function () {
  'use strict';

  angular
    .module('givdo.config', [])
    .constant('GivdoApiURL', getApiUrl());

    function getApiUrl() {
      var hostname = window.location.hostname;
      var serverUrl = (hostname === 'localhost' ? 'http://localhost:3000' : 'https://givdo-qa.herokuapp.com');

      return serverUrl + '/api/v1';
    }
})();
