'use strict';

beforeEach(module('givdo', function ($provide) {
  // $provide.factory("$ionicModal", ['$q', function ($q) {
  //   var deferModal = $q.defer();
  //   var fromTemplateUrlStub = jasmine.createSpy().and.returnValue(deferModal.promise);

  //   return {
  //     resolve: deferModal.resolve,
  //     fromTemplateUrl: fromTemplateUrlStub
  //   };
  // }]);
}));

beforeEach(inject(function ($httpBackend) {
  $httpBackend.whenGET(/templates.*/).respond(200, '');
}));
