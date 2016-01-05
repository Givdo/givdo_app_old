'use strict';

describe('Trivia', function(){
  var $http, Trivia;
  beforeEach(inject(function ($httpBackend, _Trivia_) {
    $http = $httpBackend;
    Trivia = _Trivia_;
  }));

  afterEach(function () {
    $http.verifyNoOutstandingExpectation();
    $http.verifyNoOutstandingRequest();
  });

  describe('raffle', function () {
    it('gets a trivia from the raffle endpoint', function () {
      $http.expectGET('http://test.com/api/v1/trivia/raffle').respond({id: 255});

      var trivia = Trivia.raffle()
      $http.flush();

      expect(trivia.id).toEqual(255);
    });
  });
});
