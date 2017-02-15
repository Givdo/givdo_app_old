import 'angular';

configureInterceptors.$inject = ['$httpProvider'];

function configureInterceptors($httpProvider) {
  $httpProvider.interceptors.push('sessionInterceptor');
}

protectedRoutes.$inject =[
  '$rootScope',
  '$state',
  'events',
  'sessionService',
];

function protectedRoutes($rootScope, $state, events, sessionService) {
  $rootScope.$on(events.SESSION_DOWN, function(event) {
    console.info('session down');

    event.preventDefault();
    $state.go('welcome');
  });

  $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
    var data = toState.data || {};
    var token = sessionService.getToken();
    var protectedRoute = data['protected'] || true;

    if(!token && protectedRoute && toState.name !== 'welcome') {
      event.preventDefault();
      $state.go('welcome');
    }
  });
}

export default {
  protectedRoutes: protectedRoutes,
  interceptors: configureInterceptors,
};
