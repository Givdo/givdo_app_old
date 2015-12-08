(function () {
  'use strict';

  angular.module('givdo.facebook', ['givdo.api', 'ngCordova'])

  .factory('facebook', ['$cordovaFacebook', 'OauthCallback', function ($cordovaFacebook, OauthCallback) {
    var facebookAuth = function (authResponse) {
      var data = {
        provider: 'facebook',
        uid: authResponse.userID,
        access_token: authResponse.accessToken,
        expires_in: authResponse.expiresIn
      };

      return OauthCallback.authenticate(data);
    };

    var login = function () {
      return $cordovaFacebook.login(['email', 'user_friends', 'user_about_me'])
        .then(function (data) {
          return facebookAuth(data.authResponse);
        });
    };

    var checkStatus = function () {
      return $cordovaFacebook.getLoginStatus().then(function (data) {
        return facebookAuth(data.authResponse);
      });
    };

    return {
      login: login,
      checkStatus: checkStatus,
      inviteFriends: function () {
        return $cordovaFacebook.showDialog({
          method: 'apprequests',
          message: 'Come on man, check out my application.'
        });
      }
    };
  }]);
})();
