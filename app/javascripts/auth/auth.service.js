import 'angular';

AuthService.$inject = [
  '$q',
  '$rootScope',
  'events',
  'sessionService',
  'config',
  '$cordovaOauth',
  'OAuthRepository',
];

function AuthService($q, $rootScope, events, sessionService, config, $cordovaOauth, OAuthRepository) {
  var deferred = $q.defer();
  var service = {
    authenticate: authenticate,
    facebookSignIn: facebookSignIn,
  };

  return service;


  function saveSession(s) {
    session(s);
    sessionService.start(s.id, s.attr('exp_in'));
  }

  function loginSuccess(session) {
    saveSession(session);
    $rootScope.$broadcast(events.LOGIN_SUCCESS);
    deferred.resolve();
  }

  function loginFailed(error) {
    console.error(error);
    $rootScope.$broadcast(events.LOGIN_FAILED);
    deferred.reject(error);
  }

  function loginOrSignup(response) {
    var data = {
      provider: 'facebook',
      uid: response.userID,
      expires_in: response.expires_in,
      access_token: response.access_token,
    };

    OAuthRepository
    .callback(data)
    .then(loginSuccess)
    .catch(loginFailed);
  }

  function authenticate() {
    OAuthRepository
    .profile()
    .then(loginSuccess)
    .catch(loginFailed);

    return deferred.promise;
  }

  function facebookSignIn() {
    $cordovaOauth
    .facebook(config.facebook.appID, config.facebook.scopes)
    .then(loginOrSignup)
    .catch(function (error) {
      console.error(error);
      deferred.reject(error);
    });

    return deferred.promise;
  }
}

export default AuthService;
