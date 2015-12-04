'use strict';

describe('facebook', function () {
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

  describe('login', function () {
    it('logins with facebook with email, user_friends and user_about_me permissions', inject(function ($cordovaFacebook) {
      facebook.login();

      expect($cordovaFacebook.login).toHaveBeenCalledWith(['email', 'user_friends', 'user_about_me']);
    }));

    it('authenticates with the login data', inject(function ($rootScope, OauthCallback) {
      facebook.login();
      deferredFacebookLogin.resolve({
        authResponse: {
          userID: 'facebook id',
          accessToken: 'access crazy token',
          expiresIn: 'a few days bro'
        }
      });
      $rootScope.$digest();

      expect(OauthCallback.authenticate).toHaveBeenCalledWith({
        provider: 'facebook',
        uid: 'facebook id',
        access_token: 'access crazy token',
        expires_in: 'a few days bro'
      });
    }));

    it('saves the oauth token when authenticated', inject(function ($rootScope, session) {
      facebook.login();
      deferredFacebookLogin.resolve({authResponse: {}});
      deferredOauthCallback.resolve({token: 'some token'});
      $rootScope.$digest();

      expect(session.token()).toEqual('some token');
    }));
  });
});
