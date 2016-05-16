(function () {
  'use strict';

  angular
    .module('givdo.api')
    .factory('GameRepository', ['GivdoApiURL', 'repository', GameRepository]);


    function GameRepository(baseUrl, Repository) {
      var repository = Repository({
        query: { url: baseUrl + '/games' },
        singlePlayer: { url: baseUrl + '/games/single' },
        versus: {
          params: false,
          url: baseUrl + '/games/versus/{{uid}}',
        },
      });

      repository.answer = function (game, trivia, option) {
        var data = {
          trivia_id: trivia.id,
          trivia_option_id: option.id,
        };

        return game.load('answers', { data: data, method: 'POST' });
      };

      repository.playFor = function (game, organization) {
        var data = { organization_id: organization.id };

        return game.load('player', { data: data, method: 'PATCH' });
      };

      return repository;
    }
})();
