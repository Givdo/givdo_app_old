'use strict';

describe('ChallengeFriendCtrl', function(){
  var $scope, GameRepo, UserRepo, QuizRound, friendsDefer, facebook, controller;
  beforeEach(inject(function ($rootScope, $controller, $q) {
    $scope = $rootScope.$new();
    facebook = jasmine.createSpyObj('facebook', ['invite']);
    QuizRound = jasmine.createSpyObj('quiz round', ['continue']);
    UserRepo = jasmine.createSpyObj('UserRepo', ['friends']);
    GameRepo = jasmine.createSpyObj('GameRepo', ['versus']);
    friendsDefer = $q.defer();
    UserRepo.friends.and.returnValue(friendsDefer.promise);

    controller = $controller('ChallengeFriendCtrl', {
      $scope: $scope,
      QuizRound: QuizRound,
      GameRepo: GameRepo,
      UserRepo: UserRepo,
      facebook: facebook
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
      GameRepo.versus.and.returnValue(createDefer.promise);
    }));

    it('creates a game with the friend user', inject(function () {
      $scope.challenge(friend);

      expect(GameRepo.versus).toHaveBeenCalledWith({id: 'facebook-123456'});
    }));
  });

  describe('invite()', function () {
    var inviteDefer, friend;
    beforeEach(inject(function ($q, resource) {
      GameRepo.versus.and.returnValue($q.when());
    }));

    it('invites using the facebook invite wrapper', inject(function () {
      $scope.invite();

      expect(facebook.invite).toHaveBeenCalled();
    }));
  });
});
