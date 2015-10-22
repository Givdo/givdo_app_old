'use strict';

beforeEach(module('givdo'));

beforeEach(inject(function ($httpBackend) {
  $httpBackend.whenGET(/templates.*/).respond(200, '');
}));
