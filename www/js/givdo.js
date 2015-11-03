(function () {
  'use strict';

  angular.module('givdo', ['ionic', 'ionic.contrib.ui.tinderCards', 'givdo.auth', 'givdo.quiz'])
    .run(['$ionicPlatform', 'authLock', function ($ionicPlatform, authLock) {
      $ionicPlatform.ready(function () {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);

        }
        if (window.StatusBar) {
          // org.apache.cordova.statusbar required
          StatusBar.styleDefault();
        }

        authLock('app.profile');
      });
    }])

    .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
      $stateProvider.state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'templates/menu.html'
      });
      // if none of the above states are matched, use this as the fallback
      $urlRouterProvider.otherwise('/app/quiz/choose-organization');
    }]);
})();
