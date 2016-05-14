(function () {
  'use strict';

  angular
    .module('givdo.welcome')
    .controller('WelcomeController', [
      '$state',
      '$rootScope',
      '$ionicLoading',
      'AuthService',
      WelcomeController
    ]);


    function WelcomeController($state, $rootScope, $ionicLoading, AuthService) {
      var vm = this;

      vm.facebookSignIn = facebookSignIn;


      function loginSuccess() {
        $ionicLoading.hide();
        $state.go('profile');
      }

      function fbLoginSuccess(response) {
        AuthService
          .signup(response.authResponse)
          .then(loginSuccess);
      }

      function fbLoginError(error) {
        console.log('error:' + error);
        $ionicLoading.hide();
      }

      function facebookSignIn() {
        $ionicLoading.show({ template: 'Signing in...' });

        facebookConnectPlugin.getLoginStatus(function(response) {
          if (response.status === 'connected') {
            AuthService
              .login(response.authResponse)
              .then(loginSuccess);
          } else {
            var facebookPermissions = ['email', 'user_friends', 'user_about_me'];
            facebookConnectPlugin.login(facebookPermissions, fbLoginSuccess, fbLoginError);
          }
        });
      }
    }

})();
