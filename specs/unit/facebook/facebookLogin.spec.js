'use strict';

describe('facebook.login', function () {
  var facebook, deferredFacebookLogin;
  beforeEach(inject(function ($q, $injector, $cordovaFacebook) {
    deferredFacebookLogin = $q.defer();
    spyOn($cordovaFacebook, 'login');
    $cordovaFacebook.login.and.returnValue(deferredFacebookLogin.promise);

    facebook = $injector.get('facebook');
  }));

  it('logins with facebook with email, user_friends and user_about_me permissions', inject(function ($cordovaFacebook) {
    facebook.login();

    expect($cordovaFacebook.login).toHaveBeenCalledWith(['email', 'user_friends', 'user_about_me']);
  }));

  it('fails the promise when facebook login fails', inject(function ($rootScope) {
    var fails = jasmine.createSpy();

    facebook.login().then(null, fails);
    deferredFacebookLogin.reject();
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('fails the promise when facebook status is not connected', inject(function ($rootScope) {
    var fails = jasmine.createSpy();

    facebook.login().then(null, fails);
    deferredFacebookLogin.resolve({status: 'unknown'});
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('fails the promise when givdo oauth fails', inject(function ($rootScope, givdo) {
    var fails = jasmine.createSpy();

    facebook.login().then(null, fails);
    deferredFacebookLogin.resolve({authResponse: {}});
    givdo.oauth.deferred_callback.reject();
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('authenticates on oauth and returns the token', inject(function ($rootScope, givdo, testSession) {
    var login = facebook.login();

    deferredFacebookLogin.resolve({status: 'connected', authResponse: {userID: '123', accessToken: 'facebook access token', expiresIn: '123'}});
    givdo.oauth.deferred_callback.resolve(testSession);
    $rootScope.$digest();

    expect(givdo.oauth.callback).toHaveBeenCalledWith({uid: '123', provider: 'facebook', access_token: 'facebook access token', expires_in: '123'});
    expect(login).toResolveTo(testSession);
  }));
});
