(function () {
  'use strict';

  angular
    .module('givdo.auth')
    .factory('session', session)
    .factory('loginModal', loginModal)
    .factory('authLock', authLock)
    .controller('FacebookLoginCtrl', FacebookLoginCtrl);


    session.$inject = ['$rootScope', '$q'];

    function session($rootScope, $q) {
      var sessionDefer = $q.defer();

      var session = function (newSession) {
        if (newSession) {
          $rootScope.currentUser = newSession.relation('user');
          sessionDefer.resolve(newSession);
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
