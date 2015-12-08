(function () {
  'use strict';

  angular.module('givdo.auth', ['givdo.config', 'givdo.facebook', 'LocalStorageModule'])
    .config(['$httpProvider', 'localStorageServiceProvider', function ($httpProvider, localStorageServiceProvider) {
      $httpProvider.interceptors.push('sessionInterceptor');
      localStorageServiceProvider.setPrefix('givdo');
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
        responseError: function (response) {
          if (shouldIntercept(response.config) && response.status == 401) {
            session.clear();
          }
          return response;
        }
      }
    }])

    .factory('session', ['$rootScope', 'localStorageService', function ($rootScope, localStorageService) {
      var SessionTokenKey = 'session.token';

      return {
        token: function (newToken) {
          if (newToken !== undefined) {
            localStorageService.set(SessionTokenKey, newToken);
            $rootScope.$emit('givdo:session:up');
          }
          return localStorageService.get(SessionTokenKey);
        },
        clear: function  () {
          debugger;
          localStorageService.remove(SessionTokenKey);
          $rootScope.$emit('givdo:session:down');
        }
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

    .factory('authLock', ['$rootScope', 'facebook', 'session', 'loginModal', function ($rootScope, facebook, session, loginModal) {
      return function () {
        $rootScope.$on('givdo:session:up', loginModal.close);
        $rootScope.$on('givdo:session:down', loginModal.open);

        facebook.checkStatus().then(function (auth) {
          session.token(auth.token);
        }, function () {
          session.clear();
        });
      };
    }])

    // TODO: extract this to givdo.facebook
    .controller('FacebookLoginCtrl', ['$scope', 'facebook', 'session', function ($scope, facebook, session) {
      $scope.facebookLogin = function () {
        facebook.login().then(function (auth) {
          console.log("Facebook Login: %j", auth);
          session.token(auth.token);
        }, function (err) {
          console.log("Login error: %j", err);
        });
      };
    }]);
})();
