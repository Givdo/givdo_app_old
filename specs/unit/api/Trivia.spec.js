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

  describe('$answer', function () {
    it('posts the answer to the answer method of the trivia', function () {
      $http.expectPOST('http://test.com/api/v1/trivia/10/answer', {option_id: 20, id: 10}).respond({});

      var trivia = new Trivia({id: 10});

      trivia.$answer({id: 20});
      $http.flush();
    });
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
