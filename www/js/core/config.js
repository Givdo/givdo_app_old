(function () {
  'use strict';

  angular
    .module('givdo.core')
    .config(['facebookConfig', '$cordovaFacebookProvider', configurePlugins])
    .config(['$httpProvider', configureSerializer])
    .config(['$ionicConfigProvider', configureIonic])
    .run(['$ionicPlatform', configurePlatform]);


  function configurePlugins(facebookConfig, $facebookProvider) {
    if (window.cordova) return;

    $facebookProvider.browserInit(facebookConfig.appID, facebookConfig.version);
  }

  function configureSerializer($httpProvider) {
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  }

  function configureIonic($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
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
