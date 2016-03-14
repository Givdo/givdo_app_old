'use strict';

describe('ChallengeFriendCtrl', function(){
  var $scope, QuizRound, facebook, controller;
  beforeEach(inject(function ($rootScope, $controller, $q) {
    $scope = $rootScope.$new();
    facebook = jasmine.createSpyObj('facebook', ['invite']);
    QuizRound = jasmine.createSpyObj('quiz round', ['continue']);

    controller = $controller('ChallengeFriendCtrl', {
      $scope: $scope,
      QuizRound: QuizRound,
      facebook: facebook
    });
  }));

  describe('initialization', function () {
    it('loads the user friends into the scope', inject(function (givdo) {
      var friendsList = jasmine.createSpyObj('friends list', ['relation'])
      friendsList.relation.and.returnValue(['user 1', 'user 2']);
      givdo.user.deferred_friends.resolve(friendsList);
      $scope.$digest();

      expect($scope.friends).toEqual(['user 1', 'user 2']);
      expect(friendsList.relation).toHaveBeenCalledWith('users');
    }));
  });

  describe('challenge(friend)', function () {
    var friend;
    beforeEach(inject(function ($q, resource) {
      friend = resource({attributes: {provider: 'facebook', uid: 'facebook-123456'}});
    }));

    it('creates a game with the friend user', inject(function (givdo) {
      $scope.challenge(friend);

      expect(givdo.game.versus).toHaveBeenCalledWith(friend);
    }));
  });

  describe('invite()', function () {
    it('invites using the facebook invite wrapper', inject(function () {
      $scope.invite();

      expect(facebook.invite).toHaveBeenCalled();
    }));
  });
});
