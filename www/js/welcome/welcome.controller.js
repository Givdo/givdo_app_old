(function () {
  'use strict';

  angular
    .module('givdo.welcome')
    .controller('WelcomeController', ['$state', '$ionicLoading', WelcomeController]);


    WelcomeController.$inject = [];

    function WelcomeController($state, $ionicLoading) {
      var vm = this;

      vm.facebookSignIn = facebookSignIn;

      function facebookSignIn() {
        facebookConnectPlugin.getLoginStatus(function(response) {
          $ionicLoading.show({ template: 'Signing in...' });

          if (response.status === 'connected') {
            console.log('connected');

            $ionicLoading.hide();
            $state.go('profile');
          } else {
            console.log('not_authorized');

            setTimeout($ionicLoading.hide, 2000);
          }
        });
      }
    }
})();
