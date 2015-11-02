(function () {
  'use strict';

  angular.module('givdo.api', ['ngResource', 'givdo.config'])

    .factory('Organization', ['$resource', 'GivdoApiURL', function ($resource, GivdoApiURL) {
      return $resource(GivdoApiURL + '/organizations/:organization_id', {organizationId: '@id'});
    }])

    .factory('Trivia', ['$resource', 'GivdoApiURL', function ($resource, GivdoApiURL) {
      return $resource(GivdoApiURL + '/trivia/:triviaId', {triviaId: '@id'});
    }]);
})();
