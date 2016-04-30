(function () {
  'use strict';

  angular.module('givdo.api', ['json-api-client', 'givdo.config'])
    .config(['$httpProvider', function ($httpProvider) {
      $httpProvider.defaults.paramSerializer = '$httpParamSerializerJQLike';
    }])

    .factory('Oauth', ['repository', 'GivdoApiURL', function (repository, GivdoApiURL) {
      return repository({
        callback: {url: GivdoApiURL + '/oauth/{{provider}}/callback', method: 'POST', auth: false}
      });
    }])

    .factory('UserRepo', ['repository', 'GivdoApiURL', function (repository, GivdoApiURL) {
      var UserRepo = repository({
        friends: {url: GivdoApiURL + '/friends', method: 'GET'},
        activities: { url: GivdoApiURL + '/activities', method: 'GET', params: false }
      });
      UserRepo.update = function (user, data) {
        return user.load('self', {data: data, method: 'PATCH'});
      };
      return UserRepo;
    }])

    .factory('OrganizationRepo', ['repository', 'GivdoApiURL', function (repository, GivdoApiURL) {
      return repository({
        query: {url: GivdoApiURL + '/organizations'}
      });
    }])

    .factory('GameRepo', ['repository', 'GivdoApiURL', function (repository, GivdoApiURL) {
      var GameRepo = repository({
        singlePlayer: {url: GivdoApiURL + '/games/single'},
        versus: {url: GivdoApiURL + '/games/versus/{{uid}}', params: false},
        query: {url: GivdoApiURL + '/games'}
      });

      GameRepo.answer = function (game, trivia, option) {
        return game.load('answers', {data: {trivia_id: trivia.id, trivia_option_id: option.id}, method: 'POST'});
      };

      GameRepo.playFor = function (game, organization) {
        return game.load('player', {data: {organization_id: organization.id}, method: 'PATCH'});
      };

      return GameRepo;
    }])

    .factory('DeviceRepo', ['repository', 'GivdoApiURL', function(repository, apiURL) {
      return repository({
        register: { url: '/devices' },
      });
    }])

    .factory('givdo', ['Oauth', 'UserRepo', 'GameRepo', 'OrganizationRepo', function (Oauth, UserRepo, GameRepo, OrganizationRepo) {
      return {
        oauth: Oauth,
        user: UserRepo,
        game: GameRepo,
        organizations: OrganizationRepo
      };
    }]);
})();
