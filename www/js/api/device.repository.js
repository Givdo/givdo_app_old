(function () {
  'use strict';

  angular
    .module('givdo.api')
    .factory('DeviceRepository', ['GivdoApiURL', 'repository', DeviceRepository]);


    function DeviceRepository(baseUrl, Repository) {
      return Repository({
        register: { url: '/devices' },
      });
    }
})();
