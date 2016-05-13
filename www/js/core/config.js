(function () {
  'use strict';

  angular
    .module('givdo.core')
    .config(['$httpProvider', configureSerializer])
    .run(['$ionicPlatform', configurePlatform]);


  function configureSerializer($httpProvider) {
    // console.log('givdo.core configureSerializer');
    $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
  }

  function configurePlatform($ionicPlatform) {
    // console.log('givdo.core configurePlatform');

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
