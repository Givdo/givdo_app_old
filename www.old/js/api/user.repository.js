(function () {
  'use strict';

  angular
    .module('givdo.api')
    .factory('UserRepository', ['GivdoApiURL', 'repository', 'transport', UserRepository]);


    function UserRepository(baseUrl, Repository, transport) {
      var repository = Repository({
        friends: {
          method: 'GET',
          url: baseUrl + '/friends',
        },
        activities: {
          method: 'GET',
          params: false,
          url: baseUrl + '/activities',
        },
        causes: {
          method: 'POST',
          url: baseUrl + '/causes',
        }
      });

      repository.update = function (user, data) {
        return transport.load(baseUrl + '/user', { data: data, method: 'PATCH' });
      }

      repository.notifications = function (page) {
        return transport.load(baseUrl + '/notifications', { method: 'GET' });
      }

      repository.get_friend = function (id) {
        return transport.load(baseUrl + '/friends/' + id, { method: 'GET' });
      }

      return repository;
    }
})();
