(function () {
  'use strict';

  angular
    .module('givdo.auth', [
      'givdo.config',
      'givdo.facebook',
      'LocalStorageModule'
    ])
    .config(config)
    .factory('sessionInterceptor', sessionInterceptor)
    .factory('session', session)
    .factory('loginModal', loginModal)
    .factory('authLock', authLock)
    .controller('FacebookLoginCtrl', FacebookLoginCtrl);


    config.$inject = ['$httpProvider', 'localStorageServiceProvider'];

    function config($httpProvider, localStorageServiceProvider) {
      $httpProvider.interceptors.push('sessionInterceptor');
      localStorageServiceProvider.setPrefix('givdo');
    }

    sessionInterceptor.$inject = ['GivdoApiURL', 'session', '$q'];

    function sessionInterceptor(baseUrl, session, $q) {
      var service = {
        request: request,
        responseError: responseError,
      };

      return service;

      function shouldIntercept(config) {
        return config.auth !== false && config.url.indexOf(baseUrl) === 0;
      }

      function request(config) {
        if (shouldIntercept(config)) {
          return session.token().then(function (token) {
            config.headers.Authorization = 'Token token="' + token + '"';
            return config;
          });
        }

        return config;
      }

      function responseError(response) {
        if (shouldIntercept(response.config) && response.status == 401) {
          session.clear();
        }

        return $q.reject(response);
      }
    }

    session.$inject = ['$rootScope', '$q'];

    function session($rootScope, $q) {
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
    }

    loginModal.$inject = ['$ionicModal'];

    function loginModal($modal) {
      var modal = $modal.fromTemplateUrl('templates/auth/login.html', {
        animation: 'slide-in-up'
      });

      var service = {
        open: openModal,
        close: closeModal,
      };

      return service;

      function openModal() {
        modal.then(function (modal) {
          modal.show();
        });
      }

      function closeModal() {
        modal.then(function (modal) {
          modal.hide();
        });
      }
    }

    authLock.$inject = ['$rootScope', 'facebook', 'session', 'loginModal'];

    function authLock($rootScope, facebook, session, loginModal) {
      return function () {
        $rootScope.$on('givdo:session:up', loginModal.close);
        $rootScope.$on('givdo:session:down', loginModal.open);

        facebook.checkStatus().then(session, session.clear);
      };
    }

    FacebookLoginCtrl.$inject = ['$scope', '$ionicPopup', 'facebook', 'session'];

    function FacebookLoginCtrl($scope, $ionicPopup, facebook, session) {
      $scope.facebookLogin = login;

      function login() {
        facebook.login().then(session, function (error) {
          $ionicPopup.alert({
           title: 'Uh, oh!',
           template: error.attr('message')
         });
        });
      };
    }
})();
