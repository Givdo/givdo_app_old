'use strict';

describe('NewGameCtrl', function(){
  var $scope, $state, facebook, QuizRound, inviteDefer, controller;
  beforeEach(inject(function ($rootScope, $controller, $q) {
    $scope = $rootScope.$new();
    $state = jasmine.createSpyObj('$state', ['go']);
    QuizRound = jasmine.createSpyObj('quiz round', ['start']);
    facebook = jasmine.createSpyObj('facebook service', ['gameInvite']);
    inviteDefer = $q.defer();
    facebook.gameInvite.and.returnValue(inviteDefer.promise);

    controller = function () {
      return $controller('NewGameCtrl', {
        $scope: $scope,
        facebook: facebook,
        $state: $state,
        QuizRound: QuizRound
      });
    };
  }));

  describe('inviteFriends()', function () {
    it('invites the facebook users with a nice message', function () {
      controller();

      $scope.inviteFriends();

      expect(facebook.gameInvite).toHaveBeenCalledWith('Come play with me for a fairer world!');
    });

    it('starts the game and moves to the organization screen after invite', inject(function ($rootScope) {
      controller();

      $scope.inviteFriends();
      inviteDefer.resolve('game');
      $rootScope.$digest();

      expect(QuizRound.start).toHaveBeenCalledWith('game');
      expect($state.go).toHaveBeenCalledWith('choose-organization');
    }));
  });
});
