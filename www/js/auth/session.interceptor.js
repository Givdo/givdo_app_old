(function () {
  'use strict';

  angular
    .module('givdo.auth')
    .factory('sessionInterceptor', [
      '$rootScope',
      'GivdoApiURL',
      'session',
      '$q',
      sessionInterceptor
    ]);


    function sessionInterceptor($rootScope, baseUrl, session, $q) {
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
          return session.token().then(function (token) {
            config.headers.Authorization = 'Token token="' + token + '"';
            return config;
          });
        }

        return config;
      }

      function responseError(response) {
        if (shouldIntercept(response.config) && response.status == 401) {
          session.clear();
          $rootScope.$broadcast('givdo:session:down');
        }

        return $q.reject(response);
      }
    }
})();