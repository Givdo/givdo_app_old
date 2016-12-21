import 'angular';

CauseRepository.$inject = ['config', 'repository'];

function CauseRepository(config, Repository) {
  var repository = Repository({
    all: {
      method: 'GET',
      params: false,
      url: config.api + '/causes',
    },
  });

  return repository;
}

export default CauseRepository;
