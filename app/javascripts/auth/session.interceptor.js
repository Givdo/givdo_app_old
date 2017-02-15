import 'angular';

sessionInterceptor.$inject = [
  '$rootScope',
  'config',
  'sessionService',
  '$q'
];

function sessionInterceptor($rootScope, config, sessionService, $q) {
  var service = {
    request: request,
    responseError: responseError,
  };

  return service;


  function shouldIntercept(config) {
    return config.auth !== false && config.url.indexOf(config.api) === 0;
  }

  function request(config) {
    if (shouldIntercept(config)) {
      var token = sessionService.getToken();

      config.headers.Authorization = 'Token token="' + token + '"';

      return config;
    }

    return config;
  }

  function responseError(response) {
    if (shouldIntercept(response.config) && response.status === 401) {
      sessionService.destroy();
    }

    return $q.reject(response);
  }
}

export default sessionInterceptor;
