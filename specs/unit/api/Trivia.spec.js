'use strict';

describe('Trivia', function(){
  var $http;
  beforeEach(inject(function($httpBackend){
    $http = $httpBackend;
  }));

  afterEach(function() {
    $http.verifyNoOutstandingExpectation();
    $http.verifyNoOutstandingRequest();
  });

  describe('$answer', function () {
    it('posts the answer to the answer method of the trivia', inject(function (Trivia) {
      $http.expectPOST('http://test.com/api/v1/trivia/10/answer', {option_id: 20, id: 10}).respond({});

      var trivia = new Trivia({id: 10});

      trivia.$answer({id: 20});
      $http.flush();
    }));
  });
});
