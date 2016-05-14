(function () {
  'use strict';

  angular
    .module('givdo.auth')
    .service('AuthService', ['$q', '$rootScope', 'OAuthRepository', AuthService]);


    function AuthService($q, $rootScope, OAuthRepository) {
      var service = {
        login: login,
        signup: signup,
      };

      return service;


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
            $rootScope.currentUser = response.relation('user');
            deferred.resolve();
          })
          .catch(function (error) {
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
