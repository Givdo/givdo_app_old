import 'angular';

GameRepository.$inject = ['config', 'repository', 'transport'];

function GameRepository(config, Repository, transport) {
  var repository = Repository({
    query: { url: config.api + '/games' },
    singlePlayer: { url: config.api + '/games/single' },
    versus: {
      params: false,
      url: config.api + '/games/versus/{{uid}}',
    },
  });

  repository.answer = function (game, trivia, option) {
    var data = {
      trivia_id: trivia.id,
      trivia_option_id: option.id,
    };

    return transport.load(config.api + '/games/'+ game.id + '/answers', { data: data, method: 'POST' });
  };

  repository.playFor = function (game, organization) {
    var data = { organization_id: organization.id };

    return game.load('player', { data: data, method: 'PATCH' });
  };

  return repository;
}

export default GameRepository;
