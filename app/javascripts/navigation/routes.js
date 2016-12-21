import 'angular';

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'MenuBarCtrl',
      data: { protected: true },
      resolve: {
        user: function(givdo) {
          return givdo.user;
        }
      },
    });

  $urlRouterProvider.otherwise('/welcome');
}

export default routes;
