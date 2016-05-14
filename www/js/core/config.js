(function () {
  'use strict';

  angular
    .module('givdo.core')
    .config(['$cordovaFacebookProvider', configurePlugins])
    .config(['$httpProvider', configureSerializer])
    .run(['$ionicPlatform', configurePlatform]);


  function configurePlugins($facebookProvider) {
    $facebookProvider.browserInit('558889160934969', 'v2.5');
  }

  function configureSerializer($httpProvider) {
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  }

  function configurePlatform($ionicPlatform) {
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
