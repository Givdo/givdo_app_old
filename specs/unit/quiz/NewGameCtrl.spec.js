'use strict';

describe('NewGameCtrl', function(){
  var $scope, facebook, QuizRound, inviteDefer, controller;
  beforeEach(inject(function ($rootScope, $controller, $q) {
    $scope = $rootScope.$new();
    QuizRound = jasmine.createSpyObj('quiz round', ['continue']);
    facebook = jasmine.createSpyObj('facebook service', ['gameInvite']);
    inviteDefer = $q.defer();
    facebook.gameInvite.and.returnValue(inviteDefer.promise);

    controller = function () {
      return $controller('NewGameCtrl', {
        $scope: $scope,
        facebook: facebook,
        QuizRound: QuizRound
      });
    };
  }));
});
