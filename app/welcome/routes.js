import welcomeView from './welcome.html';

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouter) {
  $urlRouter.otherwise('/welcome');

  $stateProvider.
    state('welcome', {
      url: '/welcome',
      template: welcomeView,
      controllerAs: 'vm',
      controller: 'WelcomeController',
    });
}
