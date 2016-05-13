(function () {
  'use strict';

  angular.module('givdo', ['ionic', 'givdo.auth', 'givdo.quiz', 'givdo.user', 'givdo.ui', 'givdo.notifications'])
    .run(['$ionicPlatform', 'authLock', 'notificationsRegister', function ($ionicPlatform, authLock, notificationsRegister) {
      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
          StatusBar.styleDefault();
        }

        authLock();
        notificationsRegister();
      });
    }])

    .config(['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider', function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
      $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html',
        controller: 'MenuBarCtrl'
      });
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/play');
      $ionicConfigProvider.tabs.position('bottom');
    }])

    .controller('MenuBarCtrl', ['$scope', 'session', function ($scope, session) {
      var setUser = function (user) {
        $scope.organization = user.relation('organization');
      }
      session.user().then(setUser);

      $scope.$on('givdo:user-updated', function (_, user) {
        setUser(user);
      });
    }]);
})();
