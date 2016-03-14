'use strict';

describe('facebook.checkStatus', function () {
  var facebook, deferredFacebookCheckStatus;
  beforeEach(inject(function ($q, $injector, $cordovaFacebook) {
    deferredFacebookCheckStatus = $q.defer();
    spyOn($cordovaFacebook, 'getLoginStatus');
    $cordovaFacebook.getLoginStatus.and.returnValue(deferredFacebookCheckStatus.promise);

    facebook = $injector.get('facebook');
  }));

  it('fails the promise when facebook is disconnected', inject(function ($rootScope) {
    var fails = jasmine.createSpy();

    facebook.checkStatus().then(null, fails);
    deferredFacebookCheckStatus.reject();
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('fails the promise when facebook status is not connected', inject(function ($rootScope) {
    var fails = jasmine.createSpy();

    facebook.checkStatus().then(null, fails);
    deferredFacebookCheckStatus.resolve({status: 'unknown'});
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('fails the promise when givdo oauth fails', inject(function ($rootScope, givdo) {
    var fails = jasmine.createSpy();

    facebook.checkStatus().then(null, fails);
    deferredFacebookCheckStatus.resolve({status: 'connected', authResponse: {}});
    givdo.oauth.deferred_callback.reject();
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('authenticates on oauth and returns the token', inject(function ($rootScope, givdo, testSession) {
    var checkStatus = facebook.checkStatus();

    deferredFacebookCheckStatus.resolve({status: 'connected', authResponse: {userID: '123', accessToken: 'facebook access token', expiresIn: '123'}});
    givdo.oauth.deferred_callback.resolve(testSession);
    $rootScope.$digest();

    expect(givdo.oauth.callback).toHaveBeenCalledWith({provider: 'facebook', uid: '123', access_token: 'facebook access token', expires_in: '123'});
    expect(checkStatus).toResolveTo(testSession);
  }));
});
