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
      var Game = resource('/games/:game_id/:action', {game_id: '@id'}, {
        raffle: {method: 'GET', params: {action: 'raffle'}, isArray: false},
        answer: {method: 'POST', params: {action: 'answers'}}
      });
      Game.create = function (params) {
        var game = new Game(params);
        return game.$save();
      };
      Game.prototype.$answer = function (trivia, option) {
        return Game.answer({id: this.id, trivia_id: trivia.id, option_id: option.id}).$promise;
      };
      return Game;
    }])

    .factory('Organization', ['givdoResource', function (resource) {
      return resource('/organizations/:organization_id', {organizationId: '@id'});
    }]);
})();
