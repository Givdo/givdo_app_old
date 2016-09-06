'use strict';

describe('FriendsController', function(){
  var controller, friends;

  beforeEach(inject(function ($controller) {
    friends = jasmine.createSpyObj('friends', ['relation']);
    friends.relation.and.returnValue(['user 1', 'user 2']);

    controller = $controller('FriendsController', { friends: friends });
  }));

  it('defaults maxItems to 9', function() {
    expect(controller.maxItems).toEqual(9);
  });

  it('sets friends list', function() {
    expect(controller.friends).toEqual(['user 1', 'user 2']);
    expect(friends.relation).toHaveBeenCalledWith('users');
  });
});
