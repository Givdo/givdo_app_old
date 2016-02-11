'use strict';

describe('FriendsCtrl', function(){
  var $scope, GameRepo, UserRepo, QuizRound, friendsDefer, controller;
  beforeEach(inject(function ($rootScope, $controller, $q) {
    $scope = $rootScope.$new();
    QuizRound = jasmine.createSpyObj('quiz round', ['continue']);
    UserRepo = jasmine.createSpyObj('UserRepo', ['friends']);
    GameRepo = jasmine.createSpyObj('GameRepo', ['create']);
    friendsDefer = $q.defer();
    UserRepo.friends.and.returnValue(friendsDefer.promise);

    controller = $controller('FriendsCtrl', {
      $scope: $scope,
      QuizRound: QuizRound,
      GameRepo: GameRepo,
      UserRepo: UserRepo
    });
  }));

  describe('initialization', function () {
    it('loads the user friends into the scope', inject(function () {
      var friendsList = jasmine.createSpyObj('friends list', ['relation'])
      friendsList.relation.and.returnValue(['user 1', 'user 2']);
      friendsDefer.resolve(friendsList);
      $scope.$digest();

      expect($scope.friends).toEqual(['user 1', 'user 2']);
      expect(friendsList.relation).toHaveBeenCalledWith('users');
    }));
  });

  describe('challenge(friend)', function () {
    var createDefer, friend;
    beforeEach(inject(function ($q, resource) {
      createDefer = $q.defer();
      friend = resource({attributes: {provider: 'facebook', uid: 'facebook-123456'}});
      GameRepo.create.and.returnValue(createDefer.promise);
    }));

    it('creates a game with the friend user', inject(function () {
      $scope.challenge(friend);

      expect(GameRepo.create).toHaveBeenCalledWith({provider: 'facebook', invitees: ['facebook-123456']});
    }));
  });
});
