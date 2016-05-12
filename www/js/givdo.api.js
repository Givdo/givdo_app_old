(function () {
  'use strict';

  angular
    .module('givdo.api', ['json-api-client', 'givdo.config'])
    .factory('Oauth', Oauth)
    .factory('UserRepo', UserRepo)
    .factory('OrganizationRepo', OrganizationRepo)
    .factory('GameRepo', GameRepo)
    .factory('DeviceRepo', DeviceRepo)
    .factory('givdo', givdo);

    Oauth.$inject = ['repository', 'GivdoApiURL'];

    function Oauth(repository, GivdoApiURL) {
      return repository({
        callback: { url: GivdoApiURL + '/oauth/{{provider}}/callback', method: 'POST', auth: false }
      });
    }

    UserRepo.$inject = ['repository', 'GivdoApiURL'];

    function UserRepo(repository, GivdoApiURL) {
      var UserRepo = repository({
        friends: { url: GivdoApiURL + '/friends', method: 'GET' },
        activities: { url: GivdoApiURL + '/activities', method: 'GET', params: false }
      });

      UserRepo.update = function (user, data) {
        return user.load('self', { data: data, method: 'PATCH' });
      };

      return UserRepo;
    }

    OrganizationRepo.$inject = ['repository', 'GivdoApiURL'];

    function OrganizationRepo(repository, GivdoApiURL) {
      var OrganizationRepo = repository({
        query: { url: GivdoApiURL + '/organizations' }
      });

      return OrganizationRepo;
    }

    GameRepo.$inject = ['repository', 'GivdoApiURL'];

    function GameRepo(repository, GivdoApiURL) {
      var GameRepo = repository({
        singlePlayer: { url: GivdoApiURL + '/games/single' },
        versus: { url: GivdoApiURL + '/games/versus/{{uid}}', params: false },
        query: { url: GivdoApiURL + '/games' }
      });

      GameRepo.answer = function (game, trivia, option) {
        var data = {
          trivia_id: trivia.id,
          trivia_option_id: option.id
        };

        return game.load('answers', { data: data, method: 'POST' });
      };

      GameRepo.playFor = function (game, organization) {
        var data = { organization_id: organization.id };

        return game.load('player', { data: data, method: 'PATCH' });
      };

      return GameRepo;
    }

    DeviceRepo.$inject = ['repository', 'GivdoApiURL'];

    function DeviceRepo(repository, apiURL) {
      var DeviceRepo = repository({
        register: { url: '/devices' },
      });

      return DeviceRepo;
    }

    givdo.$inject = ['Oauth', 'UserRepo', 'GameRepo', 'OrganizationRepo', 'DeviceRepo'];

    function givdo(Oauth, UserRepo, GameRepo, OrganizationRepo) {
      return {
        oauth: Oauth,
        user: UserRepo,
        game: GameRepo,
        organizations: OrganizationRepo
      };
    }

})();
