(function () {
  'use strict';

  angular
    .module('givdo', [
      'ionic',
      'givdo.auth',
      'givdo.quiz',
      'givdo.user',
      'givdo.ui',
    ])
    .config(config)
    .run(run)
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
        })
        .state('app.loading', {
          url: 'app/loading',
          templateUrl: 'templates/ui/welcome.html',
          data: { protected: false },
        });

      $urlRouterProvider.otherwise('/app/loading');
    }

    run.$inject = ['$rootScope', '$ionicPlatform', 'loginModal'];

    function run($rootScope, $ionicPlatform, loginModal) {
      // $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
      //   var protectedRoute = toState.data.protected;
      //
      //   if (protectedRoute && typeof $rootScope.currentUser === 'undefined') {
      //     event.preventDefault();
      //   }
      // });

      $ionicPlatform.ready(function () {
        if (window.cordova && window.cordova.plugins.Keyboard) {
          cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
          cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
          StatusBar.styleDefault();
        }
      });
    }

    MenuBarCtrl.$inject = ['$scope', 'session'];

    function MenuBarCtrl($scope, session) {
      session.user().then(setUser);
      $scope.$on('givdo:user-updated', function (_, user) { setUser(user); });

      function setUser(user) {
        $scope.organization = user.relation('organization');
      }
    }
})();
