(function () {
  'use strict';

  angular.module('givdo.facebook', ['givdo.api', 'ngCordova'])
    .config(['$cordovaFacebookProvider', function ($cordovaFacebookProvider) {
      if (!window.cordova) {
        ionic.Platform.ready(function () {
          $cordovaFacebookProvider.browserInit('558889160934969', 'v2.5');
        });
      }
    }])

    .factory('facebookAuth', ['OauthCallback', '$q', function (OauthCallback, $q) {
      return function (facebookData) {
        if (facebookData.status !== 'connected') {
          return $q.reject();
        }

        var authResponse = facebookData.authResponse;
        var data = {
          uid: authResponse.userID,
          access_token: authResponse.accessToken,
          expires_in: authResponse.expiresIn
        };

        return OauthCallback.authenticate('facebook', data);
      };
    }])

    .factory('facebookCheckStatus', ['$cordovaFacebook', 'facebookAuth', function ($cordovaFacebook, facebookAuth) {
      return function () {
        return $cordovaFacebook.getLoginStatus().then(facebookAuth);
      };
    }])

    .factory('facebookLogin', ['$cordovaFacebook', 'facebookAuth', function ($cordovaFacebook, facebookAuth) {
      return function () {
        return $cordovaFacebook.login(['email', 'user_friends', 'user_about_me']).then(facebookAuth);
      };
    }])

    .factory('facebookGameInvite', ['$cordovaFacebook', 'GameRepo', function ($cordovaFacebook, GameRepo) {
      return function (message) {
        return $cordovaFacebook.showDialog({
          method: 'apprequests',
          message: message,
          max_recipients: '1'
        }).then(function (response) {
          return GameRepo.versus({id: _.first(response.to)});
        });
      };
    }])

    .factory('facebook', ['facebookLogin', 'facebookCheckStatus', 'facebookGameInvite', function (facebookLogin, facebookCheckStatus, facebookGameInvite) {
      return {
        login: facebookLogin,
        checkStatus: facebookCheckStatus,
        gameInvite: facebookGameInvite
      };
    }]);
})();
