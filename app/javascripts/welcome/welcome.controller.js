(function () {
  'use strict';

  angular
    .module('givdo.welcome')
    .controller('WelcomeController', [
      '$state',
      '$ionicPopup',
      'authService',
      'sessionService',
      WelcomeController
    ]);


    function WelcomeController($state, $ionicPopup, authService, sessionService) {
      var vm = this;
      var token = sessionService.getToken();

      vm.isLoading = !!token;
      vm.facebookSignIn = facebookSignIn;

      if (token) {
        authService
          .authenticate()
          .then(loginSuccess)
          .catch(loginError);
      }

      function loginSuccess() {
        $state.go('profile');
      }

      function loginError(error) {
        var alertOptions = {
          title: 'Oops!',
          template: 'There was an error while signing in. Try again later.'
        };

        if (error.hasOwnProperty('data')) {
          alertOptions.template = error.data.error;
        }

        $ionicPopup
          .alert(alertOptions)
          .then(function() {
            vm.isLoading = false;
          });
      }

      function facebookSignIn() {
        vm.isLoading = true;

        authService
          .facebookSignIn()
          .then(loginSuccess)
          .catch(loginError);
      }
    }
})();
