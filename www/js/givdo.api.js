(function () {
  'use strict';

  angular.module('givdo.api', ['ngResource', 'givdo.config'])
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
    }])

    .factory('OauthCallback', ['$resource', 'GivdoApiURL', function ($resource, GivdoApiURL) {
      var OauthCallback = $resource(GivdoApiURL + '/oauth/:provider/callback', {}, {
        callback: {method: 'POST', params: {provider: 'facebook'}, isArray: false}
      });
      OauthCallback.authenticate = function (data) {
        return OauthCallback.callback(data).$promise;
      };
      return OauthCallback;
    }])

    .factory('Organization', ['$resource', 'GivdoApiURL', function ($resource, GivdoApiURL) {
      return $resource(GivdoApiURL + '/organizations/:organization_id', {organizationId: '@id'});
    }])

    .factory('Trivia', ['$resource', 'GivdoApiURL', function ($resource, GivdoApiURL) {
      var Trivia = $resource(GivdoApiURL + '/trivia/:triviaId/:action', {triviaId: '@id'}, {
        answer: {method: 'POST', params: {action: 'answer'}},
        raffle: {method: 'GET', params: {triviaId: 'raffle'}, isArray: false}
      });
      Trivia.prototype.$answer = function (option) {
        return Trivia.answer({id: this.id, option_id: option.id}).$promise;
      };
      return Trivia;
    }]);
})();
