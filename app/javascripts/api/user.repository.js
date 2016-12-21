import 'angular';

UserRepository.$inject = ['config', 'repository', 'transport'];

function UserRepository(config, Repository, transport) {
  var repository = Repository({
    friends: {
      method: 'GET',
      url: config.api + '/friends',
    },
    activities: {
      method: 'GET',
      params: false,
      url: config.api + '/activities',
    },
    causes: {
      method: 'POST',
      url: config.api + '/causes',
    }
  });

  repository.update = function (user, data) {
    return transport.load(config.api + '/user', { data: data, method: 'PATCH' });
  };

  repository.notifications = function (page) {
    return transport.load(config.api + '/notifications', { method: 'GET' });
  };

  repository.get_friend = function (id) {
    return transport.load(config.api + '/friends/' + id, { method: 'GET' });
  };

  return repository;
}

export default UserRepository;
