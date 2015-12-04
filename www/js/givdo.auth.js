(function () {
  'use strict';

  angular.module('givdo.auth', ['givdo.config', 'ngCordova'])
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.interceptors.push('sessionInterceptor');
    }])

    .factory('sessionInterceptor', ['GivdoApiURL', 'session', function (baseUrl, session) {
      var shouldIntercept = function (config) {
        return config.url.indexOf(baseUrl) === 0;
      };

      return {
        request: function (config) {
          if (shouldIntercept(config) && session.token()) {
            config.headers.Authorization = 'Token token="' + session.token() + '"';
          }
          return config;
        },
        response: function (response) {
          if (shouldIntercept(response.config) && response.status == 401) {
            session.clear();
          }
          return response;
        }
      }
    }])

    .factory('session', ['$rootScope', function ($rootScope) {
      var token = null;

      return {
        token: function (newToken) {
          if (newToken !== undefined) {
            token = newToken;
            $rootScope.$emit('givdo:session:up');
          }
          return token;
        },
        clear: function  () {
          token = null;
          $rootScope.$emit('givdo:session:down');
        }
      };
    }])

    .factory('facebook', ['$cordovaFacebook', 'session', 'OauthCallback', function ($cordovaFacebook, session, OauthCallback) {
      var facebookAuthData = function (authResponse) {
        return {
          provider: 'facebook',
          uid: authResponse.userID,
          access_token: authResponse.accessToken,
          expires_in: authResponse.expiresIn
        };
      };

      var login = function () {
        return $cordovaFacebook.login(['email', 'user_friends', 'user_about_me'])
          .then(function (data) {
            return OauthCallback.authenticate(facebookAuthData(data.authResponse))
              .then(function (auth) {
                session.token(auth.token);
              });
          });
      }

      var checkStatus = function (success, fail) {
        return $cordovaFacebook.getLoginStatus().then(success, fail);
      };

      return {
        login: login,
        checkStatus: checkStatus
      };
    }])

    .factory('loginModal', ['$ionicModal', function ($ionicModal) {
      var modal = $ionicModal.fromTemplateUrl('templates/auth/login.html', {animation: 'slide-in-up'});

      return {
        open: function () {
          modal.then(function (modal) {
            modal.show();
          });
        },
        close: function () {
          modal.then(function (modal) {
            modal.hide();
          });
        }
      };
    }])

    .factory('authLock', ['$rootScope', 'facebook', 'loginModal', function ($rootScope, facebook, loginModal) {
      return function () {
        $rootScope.$on('givdo:session:up', loginModal.close);
        $rootScope.$on('givdo:session:down', loginModal.open);

        facebook.checkStatus(loginModal.close, loginModal.open);
      };
    }])

    .controller('FacebookLoginCtrl', ['$scope', 'facebook', function ($scope, facebook) {
      $scope.facebookLogin = function () {
        facebook.login().then(function (response) {
          console.log("Facebook Login: %j", response);
        }, function (err) {
          console.log("Login error: %j", err);
        });
      };
    }]);
})();
