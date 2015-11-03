'use strict';

angular.module('givdo.config', [])
  .constant('GivdoApiURL', 'http://test.com/api/v1');

beforeEach(module('givdo'));

beforeEach(inject(function ($httpBackend) {
  $httpBackend.whenGET(/templates.*/).respond(200, '');
}));
