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
          controller: 'WelcomeController',
          templateUrl: 'templates/welcome/index.html',
          data: {
            protected: false,
          }
        });
    }
})();
