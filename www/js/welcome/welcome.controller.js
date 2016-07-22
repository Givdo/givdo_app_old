(function () {
  'use strict';

  angular
    .module('givdo.welcome')
    .controller('WelcomeController', [
      '$state',
      '$rootScope',
      '$ionicLoading',
      '$cordovaFacebook',
      'authService',
      WelcomeController
    ]);


    function WelcomeController($state, $rootScope, $ionicLoading, $cordovaFacebook, authService) {
      var vm = this;
      $rootScope.login_screen = true;

      vm.facebookSignIn = facebookSignIn;

      if(window.localStorage.getItem("accessToken")){
        $rootScope.login_screen = false;
        $ionicLoading.show({ template: 'Signing in...' });

        $cordovaFacebook
          .getLoginStatus()
          .then(function(response) {
            if (response.status === 'connected') {
              authService
                .login(response.authResponse)
                .then(loginSuccess)
                .catch(function (error) {
                  console.log(error);
                  $ionicLoading.hide();
                });
            }
          });
      }

      function loginSuccess() {
        $ionicLoading.hide();
        $state.go('profile');
      }

      function fbLoginSuccess(response) {
        authService
          .signup(response.authResponse)
          .then(loginSuccess);
      }

      function fbLoginError(error) {
        $ionicLoading.hide();
      }

      function facebookSignIn() {
        $ionicLoading.show({ template: 'Signing in...' });

        $cordovaFacebook
          .getLoginStatus()
          .then(function(response) {
            if (response.status === 'connected') {
              authService
                .login(response.authResponse)
                .then(function(){
                  window.localStorage.setItem("accessToken",   response.authResponse.accessToken);
                  window.localStorage.setItem("expiresIn",     response.authResponse.expiresIn);
                  window.localStorage.setItem("signedRequest", response.authResponse.signedRequest);
                  window.localStorage.setItem("userID",        response.authResponse.userID);

                  $ionicLoading.hide();
                  $state.go('profile');
                })
                .catch(function (error) {
                  console.log(error);
                  $ionicLoading.hide();
                });
            } else {
              var facebookPermissions = ['email', 'user_friends', 'user_about_me'];
              $cordovaFacebook.login(facebookPermissions, fbLoginSuccess, fbLoginError);
            }
          });
      }
    }

})();
