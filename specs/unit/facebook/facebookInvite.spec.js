'use strict';

describe('facebook.invite', function () {
  beforeEach(inject(function ($q) {
    facebookConnectPlugin.appInvite = jasmine.createSpy();
  }));

  it('invites with the game URL', inject(function (facebook) {
    facebook.invite();

    expect(facebookConnectPlugin.appInvite).toHaveBeenCalledWith({url: 'https://fb.me/603544463136105'}, jasmine.any(Function), jasmine.any(Function));
  }));

  it('resolves with the returned value', inject(function (facebook, $rootScope) {
    var func = jasmine.createSpy();
    facebookConnectPlugin.appInvite.and.callFake(function(_, success, __) {
      success({returned: 'object'});
    });
    facebook.invite().then(func);
    $rootScope.$digest();

    expect(func).toHaveBeenCalledWith({returned: 'object'});
  }));

  it('rejects with the returned value', inject(function (facebook, $rootScope) {
    var func = jasmine.createSpy();
    facebookConnectPlugin.appInvite.and.callFake(function(_, __, fail) {
      fail({fail: 'object'});
    });
    facebook.invite().then(null, func);
    $rootScope.$digest();

    expect(func).toHaveBeenCalledWith({fail: 'object'});
  }));
});
