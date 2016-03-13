'use strict';

describe('FriendsCtrl', function(){
  var $scope, UserRepo, friendsDefer, controller;
  beforeEach(inject(function ($rootScope, $controller, $q) {
    $scope = $rootScope.$new();
    UserRepo = jasmine.createSpyObj('UserRepo', ['friends']);
    friendsDefer = $q.defer();
    UserRepo.friends.and.returnValue(friendsDefer.promise);

    controller = $controller('FriendsCtrl', {
      $scope: $scope,
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
});
