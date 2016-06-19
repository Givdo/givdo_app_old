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
        return user.load('self', { data: data, method: 'PATCH' });
      }

      repository.notifications = function (page) {
        return transport.load(baseUrl + '/notifications' + page, { method: 'GET' });
      }

      return repository;
    }
})();
