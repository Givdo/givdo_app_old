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

angular.module('givdo-mocks', [])
  .factory('testSession', ['resource', function (resource) {
    return resource({
      attributes: {token: 'user-token'},
      relationships: {user: {data: {id: '1234', attributes: {name: 'John Doe'}}}}
    });
  }])

  .factory('givdo', ['$q', function ($q) {
    var mockMethods = function (names) {
      var object = {};
      _.each(names, function (name) {
        var deferred = $q.defer();
        object[name] = jasmine.createSpy().and.returnValue(deferred.promise);
        object['deferred_' + name] = deferred;
      });
      return object;
    }

    return {
      oauth: mockMethods(['callback']),
      user: mockMethods(['friends']),
      game: mockMethods(['singlePlayer', 'versus', 'query']),
      organizations: mockMethods(['query'])
    };
  }])

  .run(['session', 'testSession', function (session, testSession) {
    session(testSession);
  }]);

angular.module('givdo-test', ['givdo', 'givdo-mocks', 'ngCordovaMocks', 'givdo-test.custom-matchers']);

beforeEach(module('givdo-test'));

beforeEach(inject(function ($httpBackend) {
  $httpBackend.whenGET(/templates.*/).respond(200, '');
}));
