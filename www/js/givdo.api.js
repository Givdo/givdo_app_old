(function () {
  'use strict';

  angular.module('givdo.api', ['ngResource', 'givdo.config'])
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
    }])

    .factory('givdoResource', ['$resource', 'GivdoApiURL', function ($resource, GivdoApiURL) {
      return function (path, params, actions) {
        return $resource(GivdoApiURL + path, params, actions);
      };
    }])

    .factory('OauthCallback', ['givdoResource', function (resource) {
      var OauthCallback = resource('/oauth/:provider/callback', {}, {
        callback: {method: 'POST', params: {provider: 'facebook'}, isArray: false}
      });
      OauthCallback.authenticate = function (data) {
        return OauthCallback.callback(data).$promise;
      };
      return OauthCallback;
    }])

    .factory('Game', ['givdoResource', function (resource) {
      return resource('/games/:game_id/:action', {inviteId: '@id'}, {
        invite: {method: 'POST', params: {action: 'invite'}}
      });
    }])

    .factory('Organization', ['givdoResource', function (resource) {
      return resource('/organizations/:organization_id', {organizationId: '@id'});
    }])

    .factory('Trivia', ['givdoResource', function (resource) {
      var Trivia = resource('/trivia/:triviaId/:action', {triviaId: '@id'}, {
        answer: {method: 'POST', params: {action: 'answer'}},
        raffle: {method: 'GET', params: {triviaId: 'raffle'}, isArray: false}
      });
      Trivia.prototype.$answer = function (option) {
        return Trivia.answer({id: this.id, option_id: option.id}).$promise;
      };
      return Trivia;
    }]);
})();
