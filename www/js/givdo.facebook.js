(function () {
  'use strict';

  angular.module('givdo.facebook', ['givdo.api', 'ngCordova'])

    .factory('facebookAuth', ['OauthCallback', function (OauthCallback) {
      return function (authResponse) {
        var data = {
          provider: 'facebook',
          uid: authResponse.userID,
          access_token: authResponse.accessToken,
          expires_in: authResponse.expiresIn
        };

        return OauthCallback.authenticate(data);
      };
    }])

    .factory('facebookCheckStatus', ['$cordovaFacebook', 'facebookAuth', function ($cordovaFacebook, facebookAuth) {
      return function () {
        return $cordovaFacebook.getLoginStatus().then(function (data) {
          return facebookAuth(data.authResponse);
        });
      };
    }])

    .factory('facebookLogin', ['$cordovaFacebook', 'facebookAuth', function ($cordovaFacebook, facebookAuth) {
      return function () {
        return $cordovaFacebook.login(['email', 'user_friends', 'user_about_me']).then(function (data) {
          return facebookAuth(data.authResponse);
        });
      };
    }])

    .factory('facebookGameInvite', ['$cordovaFacebook', 'Game', function ($cordovaFacebook, Game) {
      return function (message) {
        return $cordovaFacebook.showDialog({
          method: 'apprequests',
          message: message
        }).then(function (response) {
          return Game.invite({provider: 'facebook', invitees: response.to}).$promise;
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
