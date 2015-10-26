(function () {
  'use strict';

  angular.module('givdo.api', ['ngResource', 'givdo.config'])

    .factory('Organization', ['$resource', 'GivdoApiURL', function ($resource, GivdoApiURL) {
      return $resource(GivdoApiURL + '/:organization_id', {organization_id: '@id'});
    }]);
})();
