'use strict';

describe('facebook.login', function () {
  var facebook, deferredFacebookLogin, deferredOauthCallback;
  beforeEach(inject(function ($q, $injector, $cordovaFacebook, OauthCallback) {
    deferredFacebookLogin = $q.defer();
    spyOn($cordovaFacebook, 'login');
    $cordovaFacebook.login.and.returnValue(deferredFacebookLogin.promise);

    deferredOauthCallback = $q.defer();
    spyOn(OauthCallback, 'authenticate');
    OauthCallback.authenticate.and.returnValue(deferredOauthCallback.promise);

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

  it('fails the promise when givdo oauth fails', inject(function ($rootScope) {
    var fails = jasmine.createSpy();

    facebook.login().then(null, fails);
    deferredFacebookLogin.resolve({authResponse: {}});
    deferredOauthCallback.reject();
    $rootScope.$digest();

    expect(fails).toHaveBeenCalled();
  }));

  it('authenticates on oauth and returns the token', inject(function ($rootScope, OauthCallback) {
    var succeeds = jasmine.createSpy();

    facebook.login().then(succeeds);
    deferredFacebookLogin.resolve({status: 'connected', authResponse: {userID: '123', accessToken: 'facebook access token', expiresIn: '123'}});
    deferredOauthCallback.resolve({token: 'my token'});
    $rootScope.$digest();

    expect(OauthCallback.authenticate).toHaveBeenCalledWith('facebook', {uid: '123', access_token: 'facebook access token', expires_in: '123'});
    expect(succeeds).toHaveBeenCalledWith({token: 'my token'});
  }));
});
