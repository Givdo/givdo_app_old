(function () {
  'use strict';

  angular
    .module('givdo.api')
    .service('NotificationRepository', [
      '$http',
      'GivdoApiURL',
      'repository',
      'transport',
      NotificationRepository
    ]);

    function NotificationRepository($http, baseUrl, Repository, transport) {
      var repository = Repository({});

      repository.accept = function (notification) {
        var url = baseUrl + '/notifications/' + notification.id + '/accept';

        return transport.load(url, { method: 'PUT' });
      };

      repository.reject = function (notification) {
        var url = baseUrl + '/notifications/' + notification.id + '/reject';

        return $http.put(url);
      };

      return repository;
    }
})();
