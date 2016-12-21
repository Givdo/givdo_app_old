'use strict';

configureHttpService.$inject = ['$httpProvider'];

function configureHttpService($httpProvider) {
  $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
}

configureIonic.$inject = ['$ionicConfigProvider'];

function configureIonic($ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
}

configureStorage.$inject = ['localStorageServiceProvider'];

function configureStorage(localStorageServiceProvider) {
  localStorageServiceProvider.setPrefix('givdo');
}

configurePlatform.$inject = ['$ionicPlatform'];

function configurePlatform($ionicPlatform) {
  $ionicPlatform.ready(function () {
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }

    // jshint undef:false
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}

export default {
  platform: configurePlatform,
  ionic: configureIonic,
  storage: configureStorage,
  httpService: configureHttpService,
};
