'use strict';

angular.module('givdo.config', [])
  .constant('GivdoApiURL', 'http://test.com/api/v1');

angular.module('givdo-test.custom-matchers', [])
  .factory('toResolveTo', ['$rootScope', function ($rootScope) {
    return function (util, customEqualityTesters) {
      return {
        compare: function (actual, expected) {
          var result = {};
          actual.then(function (value) {
            result.pass = util.equals(value, expected, customEqualityTesters);
          });
          $rootScope.$digest();
          return result;
        }
      };
    };
  }])

  .run(['toResolveTo', function (toResolveTo) {
    jasmine.addMatchers({
      toResolveTo: toResolveTo
    });
  }]);

angular.module('givdo-test', ['givdo', 'ngCordovaMocks', 'givdo-test.custom-matchers']);

beforeEach(module('givdo-test'));

beforeEach(inject(function ($httpBackend) {
  $httpBackend.whenGET(/templates.*/).respond(200, '');
}));
