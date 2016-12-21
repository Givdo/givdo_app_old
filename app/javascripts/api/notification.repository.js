import 'angular';

NotificationRepository.$inject = [
  '$http',
  'config',
  'repository',
  'transport',
];

function NotificationRepository($http, config, Repository, transport) {
  var repository = Repository({});

  repository.accept = function (notification) {
    var url = config.api + '/notifications/' + notification.id + '/accept';

    return transport.load(url, { method: 'PUT' });
  };

  repository.reject = function (notification) {
    var url = config.api + '/notifications/' + notification.id + '/reject';

    return $http.put(url);
  };

  return repository;
}

export default NotificationRepository;
