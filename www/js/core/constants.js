(function () {
  'use strict';

  var core = angular.module('givdo.core');

  // Debugging configuration
  // -------------------------
  var DEBUG = true;
  core.constant('DEBUG', DEBUG);

  // Facebook configuration
  // ----------------------
  core.constant('facebookConfig', {
    version: 'v2.5',
    //appID: '536213639869188',
    appID: '558889160934969',
    scopes: [
      'email',
      'user_friends',
      'user_about_me',
    ],
  });

  // Application events constants
  // ----------------------------
  core.constant('events', {
    LOGIN_FAILED: 'givdo:login:failed',
    LOGIN_SUCCESS: 'givdo:login:success',
    SESSION_UP: 'givdo:session:up',
    SESSION_DOWN: 'givdo:session:down',
  });

  // Givdo API v1.0
  // --------------
  core.constant('GivdoApiURL', getApiUrl());

  function getApiUrl() {
    return (DEBUG) ? 'http://localhost:3000/api/v1' : 'https://api.givdo.com/api/v1';
  }
})();
