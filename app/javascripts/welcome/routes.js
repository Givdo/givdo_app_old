import 'angular';

import './views/index.html';

routes.$inject = ['$stateProvider', '$urlRouterProvider'];

function routes($state, $urlRouter) {
  $urlRouter.otherwise('/welcome');

  $state
    .state('welcome', {
      url: '/welcome',
      controller: 'WelcomeController',
      templateUrl: 'welcome/views/index.html',
      data: {
        protected: false,
      }
    });
}

export default routes;
