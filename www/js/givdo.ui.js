(function () {
  'use strict';

  angular.module('givdo.ui', [])
    .config(['$stateProvider', function ($stateProvider) {
      $stateProvider.state('ui', {
        url: '/ui',
        abstract: true,
        templateUrl: 'templates/ui/menu.html'
      })
        .state('profile', {
          url: '/profile',
          parent: 'ui',
          views: {
            'menuContent': {
              templateUrl: 'templates/ui/profile.html',
              controller: 'ProfileCtrl'
            }
          }
        });
    }])

    .controller('ProfileCtrl', ['$scope', function ($scope) {
    }]);
})();
