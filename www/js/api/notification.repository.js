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
        var data = { status: 'accepted' };

        return transport.load(baseUrl + '/notifications/' + notification.id, { data: data, method: 'PATCH' });
      }

      repository.reject = function (notification) {
        var url = baseUrl + '/notifications/' + notification.id;

        return $http.patch(url, { status: 'rejected' });
      }

      return repository;
    }
})();
