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
      return resource('/oauth/:provider/callback', {}, {
        authenticate: {method: 'POST', params: {provider: 'facebook'}, isArray: false}
      });
    }])

    .factory('Game', ['givdoResource', function (resource) {
      var GameTrivia = resource('/games/:game_id/raffle');
      var Game = resource('/games/:game_id/:action', {game_id: '@id'}, {
        raffle: {method: 'GET', params: {action: 'raffle'}, isArray: false},
        single: {method: 'GET', params: {action: 'single'}, isArray: false},
        answer: {method: 'POST', params: {action: 'answers'}},
        update_player: {method: 'PATCH', params: {action: 'player'}},
        create: {method: 'POST'}
      });
      Game.prototype.$playFor = function (organization) {
        return Game.update_player({game_id: this.id}, {organization_id: organization.id});
      };
      Game.prototype.$raffle = function () {
        return GameTrivia.get({game_id: this.id});
      };
      Game.prototype.$answer = function (trivia, option) {
        return Game.answer({
          id: this.id,
          trivia_id: trivia.id,
          option_id: option.id
        });
      };
      return Game;
    }])

    .factory('Organization', ['givdoResource', function (resource) {
      return resource('/organizations/:organization_id', {organizationId: '@id'});
    }]);
})();
