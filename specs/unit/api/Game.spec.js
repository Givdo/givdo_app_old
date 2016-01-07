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

  describe('create', function () {
    it('posts to create a new game', function () {
      $http.expectPOST('http://test.com/api/v1/games', {param1: 'value 1', param2: 'value 2'}).respond({id: 10});

      Game.create({param1: 'value 1', param2: 'value 2'}, function (game) {
        expect(game.id).toEqual(10);
      });
      $http.flush();
    });
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
