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
        })
        .state('play-ui', {
          url: '/play-ui',
          parent: 'ui',
          views: {
            'menuContent': {
              templateUrl: 'templates/ui/new-game.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('trivia-ui', {
          url: '/trivia-ui',
          parent: 'ui',
          views: {
            'menuContent': {
              templateUrl: 'templates/ui/trivia.html',
              controller: 'ProfileCtrl'
            }
          }
        });
    }])

    .controller('ProfileCtrl', ['$scope', function ($scope) {
    }]);
})();
