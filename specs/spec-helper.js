'use strict';

angular.module('givdo.config', [])
  .constant('GivdoApiURL', 'http://test.com/api/v1');

angular.module('givdo-test.custom-matchers', [])
  .factory('toResolveTo', ['$rootScope', function ($rootScope) {
    return function (util, customEqualityTesters) {
      return {
        compare: function (promise, expected) {
          var result = {};
          promise.then(function (actual) {
            result.pass = util.equals(actual, expected, customEqualityTesters);

            if (!result.pass) {
              result.message = 'Expected ' + angular.toJson(promise) + ' to resolve to ' + angular.toJson(expected) + ' but resolved to ' + angular.toJson(actual);
            }
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
