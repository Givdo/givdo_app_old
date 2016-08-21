(function () {
  'use strict';

  angular
    .module('givdo.auth')
    .factory('sessionInterceptor', [
      '$rootScope',
      'GivdoApiURL',
      'session',
      'sessionService',
      '$q',
      sessionInterceptor
    ]);


    function sessionInterceptor($rootScope, baseUrl, session, sessionService, $q) {
      var service = {
        request: request,
        responseError: responseError,
      };

      return service;


      function shouldIntercept(config) {
        return config.auth !== false && config.url.indexOf(baseUrl) === 0;
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
        if (shouldIntercept(response.config) && response.status == 401) {
          sessionService.destroy();
        }

        return $q.reject(response);
      }
    }
})();
