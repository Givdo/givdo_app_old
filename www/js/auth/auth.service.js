(function () {
  'use strict';

  angular
    .module('givdo.auth')
    .service('authService', [
      '$q',
      '$rootScope',
      'events',
      'session',
      'OAuthRepository',
      authService
    ]);


    function authService($q, $rootScope, events, session, OAuthRepository) {
      var service = {
        login: login,
        signup: signup,
      };

      return service;


      function saveSession(s) {
        session(s);
      }

      function loginOrSignup(response) {
        var deferred = $q.defer();

        var data = {
          provider: 'facebook',
          uid: response.userID,
          expires_in: response.expiresIn,
          access_token: response.accessToken,
        };

        OAuthRepository
          .callback(data)
          .then(function (response) {
            saveSession(response);
            $rootScope.$emit(events.LOGIN_SUCCESS);
            deferred.resolve();
          })
          .catch(function (error) {
            $rootScope.$broadcast(events.LOGIN_FAILED);
            deferred.reject(error);
          });

        return deferred.promise;
      }

      function login(response) {
        return loginOrSignup(response);
      }

      function signup(response) {
        return loginOrSignup(response);
      }
    }
})();
