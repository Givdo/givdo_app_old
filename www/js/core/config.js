(function () {
  'use strict';

  angular
    .module('givdo.core')
    .config(['$httpProvider', configureSerializer])
    .config(['$ionicConfigProvider', configureIonic])
    .config(['localStorageServiceProvider', configureStorage])
    .run(['$ionicPlatform', configurePlatform]);


  function configureSerializer($httpProvider) {
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  }

  function configureIonic($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
  }

  function configureStorage(localStorageServiceProvider) {
    localStorageServiceProvider.setPrefix('givdo');
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
