'use strict';

describe('FriendsCtrl', function(){
  var $scope, controller;
  beforeEach(inject(function ($rootScope, $controller, $q) {
    $scope = $rootScope.$new();

    controller = $controller('FriendsCtrl', {$scope: $scope});
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
});
