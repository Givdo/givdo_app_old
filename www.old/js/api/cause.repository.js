(function () {
  'use strict';

  angular
    .module('givdo.api')
    .factory('CauseRepository', ['GivdoApiURL', 'repository', CauseRepository]);

    function CauseRepository(baseUrl, Repository) {
      var repository = Repository({
        all: {
          method: 'GET',
          params: false,
          url: baseUrl + '/causes',
        },
      });

      return repository;
    }
})();
