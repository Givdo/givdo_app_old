(function () {
  'use strict';

  angular
    .module('givdo.api')
    .factory('OAuthRepository', ['GivdoApiURL', 'repository', OAuthRepository]);


    function OAuthRepository(baseUrl, Repository) {
      return Repository({
        callback: {
          auth: false,
          method: 'POST',
          url: baseUrl + '/oauth/{{provider}}/callback',
        },
        profile: {
          method: 'GET',
          url: baseUrl + '/user'
        }
      });
    }
})();
