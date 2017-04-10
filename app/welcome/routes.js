import indexView from './index.html';

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

export default function routes($stateProvider, $urlRouter) {
  $urlRouter.otherwise('/welcome');

  $stateProvider.
    state('welcome', {
      url: '/welcome',
      template: indexView,
      controller: 'WelcomeController as vm',
    });
}
