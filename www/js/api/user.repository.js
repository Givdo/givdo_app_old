(function () {
  'use strict';

  angular
    .module('givdo.api')
    .factory('UserRepository', ['GivdoApiURL', 'repository', UserRepository]);


    function UserRepository(baseUrl, Repository) {
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
      });

      repository.update = function (user, data) {
        return user.load('self', { data: data, method: 'PATCH' });
      }

      return repository;
    }
})();
