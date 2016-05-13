(function () {
  'use strict';

  angular.module('givdo.auth', ['givdo.config', 'givdo.facebook', 'LocalStorageModule'])
    .config(['$httpProvider', 'localStorageServiceProvider', function ($httpProvider, localStorageServiceProvider) {
      $httpProvider.interceptors.push('sessionInterceptor');
      localStorageServiceProvider.setPrefix('givdo');
    }])

    .factory('sessionInterceptor', ['GivdoApiURL', 'session', '$q', function (baseUrl, session, $q) {
      var shouldIntercept = function (config) {
        return config.auth !== false && config.url.indexOf(baseUrl) === 0;
      };

      return {
        request: function (config) {
          if (shouldIntercept(config)) {
            return session.token().then(function (token) {
              config.headers.Authorization = 'Token token="' + token + '"';
              return config;
            });
          }
          return config;
        },
        responseError: function (response) {
          if (shouldIntercept(response.config) && response.status == 401) {
            session.clear();
          }
          return $q.reject(response);
        }
      }
    }])

    .factory('session', ['$rootScope', '$q', function ($rootScope, $q) {
      var sessionDefer = $q.defer();

      var session = function (newSession) {
        if (newSession) {
          sessionDefer.resolve(newSession);
          $rootScope.$emit('givdo:session:up');
        }
        return sessionDefer.promise;
      };

      session.token = function () {
        return session().then(function (s) {
          return s.id;
        });
      };

      session.user = function () {
        return session().then(function (s) {
          return s.relation('user');
        });
      };

      session.clear = function  () {
        sessionDefer = $q.defer();
        $rootScope.$emit('givdo:session:down');
      };

      return session;
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

        facebook.checkStatus().then(session, session.clear);
      };
    }])

    .controller('FacebookLoginCtrl', ['$scope', '$ionicPopup', 'facebook', 'session', function ($scope, $ionicPopup, facebook, session) {
      console.log(facebook.checkStatus());
      $scope.facebookLogin = function () {
        facebook.login().then(session, function (error) {
          $ionicPopup.alert({
           title: 'Uh, oh!',
           template: error
         });
        });
      };
    }]);
})();
