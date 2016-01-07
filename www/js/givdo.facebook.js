(function () {
  'use strict';

  angular.module('givdo.facebook', ['givdo.api', 'ngCordova'])

    .factory('facebookAuth', ['OauthCallback', '$q', function (OauthCallback, $q) {
      return function (facebookData) {
        if (facebookData.status !== 'connected') {
          return $q.reject();
        }

        var authResponse = facebookData.authResponse;
        var data = {
          provider: 'facebook',
          uid: authResponse.userID,
          access_token: authResponse.accessToken,
          expires_in: authResponse.expiresIn
        };

        return OauthCallback.authenticate(data).$promise;
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

    .factory('facebookGameInvite', ['$cordovaFacebook', 'Game', function ($cordovaFacebook, Game) {
      return function (message) {
        return $cordovaFacebook.showDialog({
          method: 'apprequests',
          message: message
        }).then(function (response) {
          return Game.create({provider: 'facebook', invitees: response.to}).$promise;
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
