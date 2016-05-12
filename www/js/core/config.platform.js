(function () {
  'use strict';

  var core = angular.module('givdo.core');


  core.run(['$ionicPlatform', configurePlatform]);

  function configurePlatform($ionicPlatform) {
    console.log('givdo.core configurePlatform');

    $ionicPlatform.ready(function () {
      if (window.cordova && window.cordova.plugins.Keyboard) {
        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        cordova.plugins.Keyboard.disableScroll(true);
      }

      if (window.StatusBar) {
        StatusBar.styleDefault();
      }
    });
  }
})();
