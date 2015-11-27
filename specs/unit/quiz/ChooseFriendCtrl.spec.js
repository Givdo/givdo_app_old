'use strict';

describe('ChooseFriendCtrl', function(){
  var controller, $scope, Friend;
  beforeEach(inject(function ($rootScope, $controller) {
    $scope = $rootScope.$new();
    Friend = jasmine.createSpyObj('Friend', ['query']);

    controller = function () {
      var controller = $controller('ChooseFriendCtrl', {
        $scope: $scope,
        Friend: Friend
      });
      $scope.loadFriends(); // this is called automatically by ion-infinite-scroll
      $scope.$digest();
      return controller;
    };
  }));

  describe('initialization', function () {
    it('loads the first page of Friends and the next page into the scope', function () {
      Friend.query.and.callFake(function (args, callback) {
        expect(args.page).toBe(undefined);
        callback({
          list: ['friend 1', 'friend 2'],
          next_page: ['next', {page: 'data'}]
        });
      });

      controller();

      expect($scope.friends).toEqual(['friend 1', 'friend 2']);
      expect($scope.nextPage).toEqual(['next', {page: 'data'}]);
    });
  });
});
