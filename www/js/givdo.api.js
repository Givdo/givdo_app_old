(function () {
  'use strict';

  angular.module('givdo.api', ['ngResource', 'givdo.config'])

    .factory('Organization', ['$resource', 'GivdoApiURL', function ($resource, GivdoApiURL) {
      return $resource(GivdoApiURL + '/organizations/:organization_id', {organizationId: '@id'});
    }])

    .factory('Trivia', ['$resource', 'GivdoApiURL', function ($resource, GivdoApiURL) {
      var Trivia = $resource(GivdoApiURL + '/trivia/:triviaId/:action', {triviaId: '@id'}, {
        answer: {method: 'POST', params: {action: 'answer'}}
      });
      Trivia.prototype.$answer = function(option) {
        return Trivia.answer({id: this.id, option_id: option.id}).$promise;
      };
      return Trivia;
    }]);
})();
