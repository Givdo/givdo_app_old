angular.module('givdo.auth', ['ng-token-auth'])

.config(function ($authProvider, $stateProvider) {
  $authProvider.configure({
    apiUrl: 'http://localhost:3000',
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
})

.controller('EmailLoginCtrl', ['$scope', function ($scope) {
}])

.factory('$authLock', ['$rootScope', '$ionicHistory', '$state', '$auth', function ($rootScope, $ionicHistory, $state, $auth) {
  var setup = function (login, logout) {
    $rootScope.$on('auth:registration-email-success', login);
    $rootScope.$on('auth:login-success', login);
    $rootScope.$on('auth:validation-success', login);
    $rootScope.$on('auth:validation-error', logout);
    $rootScope.$on('auth:logout-success', logout);
    $rootScope.$on('auth:invalid', logout);
    $rootScope.$on('auth:session-expired', logout);
  };
  var moveTo = function (nextState) {
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
