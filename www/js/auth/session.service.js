(function() {
  'use strict';

  angular
    .module('givdo.auth')
    .factory('sessionService', [
      '$q',
      '$rootScope',
      'events',
      'localStorageService',
      'resource',
      sessionService
    ]);

  function sessionService($q, $rootScope, events, localStorage, resource) {
    var currentToken = null;
    var currentUser = null;
    var currentTokenExpiration = null;
    var service = {
      start: start,
      destroy: destroy,
      expired: expired,
      getUser: getUser,
      getToken: getToken,
      getTokenExpiration: getTokenExpiration,
    };

    return service;


    function start(data) {
      var user = data.relation('user');

      currentToken = data.id;
      currentUser = user;
      currentTokenExpiration = null;

      localStorage.set('token', data.id);
      localStorage.set('user', JSON.stringify(user));
      localStorage.set('tokenExpiration', currentTokenExpiration);

      $rootScope.$emit(events.SESSION_UP);
    }

    function destroy() {
      currentToken = null;
      currentUser = null;
      currentTokenExpiration = null;

      localStorage.set('token', null);
      localStorage.set('user', null);
      localStorage.set('tokenExpiration', null);

      $rootScope.$emit(events.SESSION_DOWN);
    }

    function expired() {
      var now = moment();
      var tokenExpiration = getTokenExpiration();

      return moment(tokenExpiration).isBefore(now);
    }

    function getUser() {
      if (!currentUser) {
        var rawUser = localStorage.get('user');
        var user = JSON.parse(rawUser);

        currentUser = user ? resource(user) : null;
      }

      return currentUser;
    }

    function getToken() {
      if (!currentToken)
        currentToken = localStorage.get('token');

      return currentToken;
    }

    function getTokenExpiration() {
      if (!currentTokenExpiration)
        currentTokenExpiration = localStorage.get('tokenExpiration');

      return currentTokenExpiration;
    }
  }
})();
