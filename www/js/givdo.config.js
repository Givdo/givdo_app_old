(function () {
  'use strict';

  var HOSTNAME = window.location.hostname;
  var URL_SERVER = (HOSTNAME === 'localhost' ? 'localhost:3000' : 'givdo-qa.herokuapp.com');

  angular.module('givdo.config', [])
    .constant('GivdoApiURL', 'http://' + URL_SERVER + '/api/v1');

})();
