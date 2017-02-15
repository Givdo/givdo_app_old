(function () {
  'use strict';

  angular
    .module('givdo')
    .config(config)
    .controller('MenuBarCtrl', MenuBarCtrl);

    config.$inject = ['$stateProvider', '$urlRouterProvider'];

    function config($stateProvider, $urlRouterProvider) {
      $stateProvider
        .state('app', {
          url: '/app',
          abstract: true,
          templateUrl: 'templates/menu.html',
          controller: 'MenuBarCtrl',
          data: { protected: true }
        });

      $urlRouterProvider.otherwise('/welcome');
    }

    MenuBarCtrl.$inject = ['$scope', 'session'];

    function MenuBarCtrl($scope, session) {
      session.user().then(function(user) {
        setUser(user);
      });

      $scope.$on('givdo:user-updated', function(_, user) {
        setUser(user);
      });

      function setUser(user) {
        $scope.organization = user.relation('organization');
      }
    }
})();
