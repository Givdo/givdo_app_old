'use strict';

describe('Game', function(){
  var $http, Game;
  beforeEach(inject(function ($httpBackend, _Game_) {
    $http = $httpBackend;
    Game = _Game_;
  }));

  afterEach(function () {
    $http.verifyNoOutstandingExpectation();
    $http.verifyNoOutstandingRequest();
  });

  describe('$answer', function () {
    it('posts the answer to the answer method of the trivia', function () {
      $http.expectPOST('http://test.com/api/v1/games/10/answers', {id: 10, option_id: 20, trivia_id: 15}).respond({});

      var game = new Game({id: 10});

      game.$answer({id: 15}, {id: 20});
      $http.flush();
    });
  });
});
