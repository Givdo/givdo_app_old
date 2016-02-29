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
        .state('welcome-ui', {
          url: '/welcome-ui',
          parent: 'ui',
          views: {
            'menuContent': {
              templateUrl: 'templates/ui/welcome.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('no-guest-ui', {
          url: '/no-guest-ui',
          parent: 'ui',
          views: {
            'menuContent': {
              templateUrl: 'templates/ui/no-guest.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('lost-ui', {
          url: '/lost-ui',
          parent: 'ui',
          views: {
            'menuContent': {
              templateUrl: 'templates/ui/lost.html',
              controller: 'ProfileCtrl'
            }
          }
        })
        .state('won-ui', {
          url: '/won-ui',
          parent: 'ui',
          views: {
            'menuContent': {
              templateUrl: 'templates/ui/won.html',
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
