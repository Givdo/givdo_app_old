(function () {
  'use strict';

  angular
    .module('givdo.welcome')
    .config(config);


    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($state, $urlRouter) {
      $urlRouter.otherwise('/welcome');

      $state
        .state('welcome', {
          url: '/welcome',
          templateUrl: 'templates/welcome/index.html',
          controller: 'WelcomeController'
        });
    }
})();
