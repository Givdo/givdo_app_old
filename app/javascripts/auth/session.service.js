/* globals moment */
import 'angular';

SessionService.$inject = [
  '$q',
  '$rootScope',
  'events',
  'localStorageService',
];

function SessionService($q, $rootScope, events, localStorage) {
  var currentToken = null;
  var currentTokenExpiration = null;
  var service = {
    start: start,
    destroy: destroy,
    expired: expired,
    getToken: getToken,
    getTokenExpiration: getTokenExpiration,
  };

  return service;


  function start(token, expiresIn) {
    currentToken = token;
    currentTokenExpiration = expiresIn;

    localStorage.set('token', token);
    localStorage.set('tokenExpiration', expiresIn);

    $rootScope.$broadcast(events.SESSION_UP);
  }

  function destroy() {
    currentToken = null;
    currentTokenExpiration = null;

    localStorage.set('token', null);
    localStorage.set('tokenExpiration', null);

    $rootScope.$broadcast(events.SESSION_DOWN);
  }

  function expired() {
    var now = moment();
    var tokenExpiration = getTokenExpiration();

    return moment(tokenExpiration).isBefore(now);
  }

  function getToken() {
    if (!currentToken) {
      currentToken = localStorage.get('token');
    }

    return currentToken;
  }

  function getTokenExpiration() {
    if (!currentTokenExpiration) {
      currentTokenExpiration = localStorage.get('tokenExpiration');
    }

    return currentTokenExpiration;
  }
}

export default SessionService;
