(function () {
  'use strict';

  angular
    .module('givdo.api')
    .factory('OrganizationRepository', ['GivdoApiURL', 'repository', OrganizationRepository]);


    function OrganizationRepository(baseUrl, Repository) {
      return Repository({
        query: { url: baseUrl + '/organizations' },
      });
    }
})();
