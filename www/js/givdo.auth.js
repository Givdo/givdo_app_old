(function () {
  'use strict';

  angular.module('givdo.auth', ['ng-token-auth'])

    .constant('GivdoApiURL', 'http://givdo-app.ngrok.com/api/v1')

    .config(['$authProvider', '$stateProvider', 'GivdoApiURL', function ($authProvider, $stateProvider, GivdoApiURL) {
      $authProvider.configure({
        apiUrl: GivdoApiURL,
        storage: 'localStorage',
        validateOnPageLoad: false
      });

      $stateProvider.state('auth', {
        url: '/auth',
        abstract: true,
        templateUrl: 'templates/auth/layout.html',
        controller: 'AppCtrl'
      })
        .state('auth.email-login', {
          url: '/email-login',
          views: {
            'content': {
              templateUrl: 'templates/auth/email-login.html',
              controller: 'EmailLoginCtrl'
            }
          }
        });
    }])

    .controller('EmailLoginCtrl', ['$scope', '$auth', '$ionicPopup', function ($scope, $auth, $ionicPopup) {
      $scope.loginData = {};
      $scope.login = function () {
        $auth.submitLogin($scope.loginData).then(null, function () {
          $ionicPopup.alert({
            title: 'Login Failed',
            template: 'Please, check your credentials and try again.'
          });
        });
      };

      $scope.newAccount = {};
      $scope.createAccount = function () {
        $auth.submitRegistration($scope.newAccount).then(null, function () {
          $ionicPopup.alert({
            title: 'Registration Failed',
            template: 'Please, your data and try again.'
          });
        });
      };
    }])

    .factory('authLock', ['$rootScope', '$ionicHistory', '$state', '$auth', function ($rootScope, $ionicHistory, $state, $auth) {
      var setup = function (login, logout) {
        $rootScope.$on('auth:registration-email-success', login);
        $rootScope.$on('auth:login-success', login);
        $rootScope.$on('auth:validation-success', login);
        $rootScope.$on('auth:validation-error', logout);
        $rootScope.$on('auth:logout-success', logout);
        $rootScope.$on('auth:invalid', logout);
        $rootScope.$on('auth:session-expired', logout);
      }, moveTo = function (nextState) {
        $ionicHistory.nextViewOptions({
          disableBack: true
        });
        $state.go(nextState, {}, {reload: true});
      };

      return function (afterLoginState) {
        setup(function (_, user) {
          moveTo(afterLoginState);
        }, function () {
          moveTo('auth.email-login');
        });

        return $auth.validateUser();
      };
    }]);
})();