'use strict';

describe('GameRepo', function() {
  var GameRepo;
  beforeEach(inject(function (_GameRepo_) {
    GameRepo = _GameRepo_;
  }));

  describe('class methods', function () {
    var $http;
    beforeEach(inject(function ($httpBackend) {
      $http = $httpBackend;
    }));

    afterEach(function () {
      $http.verifyNoOutstandingExpectation();
      $http.verifyNoOutstandingRequest();
    });

    describe('versus', function () {
      it('gets the game versus the given user', function () {
        $http.expectGET('http://test.com/api/v1/games/versus/12345?id=12345').respond({
          data: {id: 10}
        });

        GameRepo.versus({id: '12345'}).then(function (game) {
          expect(game.id).toEqual(10);
        });
        $http.flush();
      });
    });

    describe('singlePlayer', function () {
      it('posts to create a new game', function () {
        $http.expectGET('http://test.com/api/v1/games/single').respond({
          data: {id: 10}
        });

        GameRepo.singlePlayer().then(function (game) {
          expect(game.id).toEqual(10);
        });
        $http.flush();
      });
    });
  });

  describe('answer', function () {
    it('posts the answer to the answer method of the trivia', function () {
      var game = jasmine.createSpyObj('game', ['load']);

      GameRepo.answer(game, {id: 15}, {id: 20});

      expect(game.load).toHaveBeenCalledWith('answers', {data: {
        trivia_id: 15, trivia_option_id: 20
      }, method: 'POST'});
    });
  });

  describe('playFor', function () {
    it('patches the player with the organization id', function () {
      var game = jasmine.createSpyObj('game', ['load']);

      GameRepo.playFor(game, {id: 15});

      expect(game.load).toHaveBeenCalledWith('player', {
        data: {organization_id: 15},
        method: 'PATCH'
      });
    });
  });
});
