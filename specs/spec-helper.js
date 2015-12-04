'use strict';

angular.module('givdo.config', [])
  .constant('GivdoApiURL', 'http://test.com/api/v1');

angular.module('givdo-test', ['givdo', 'ngCordovaMocks']);

beforeEach(module('givdo-test'));

beforeEach(inject(function ($httpBackend) {
  $httpBackend.whenGET(/templates.*/).respond(200, '');
}));
