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

    .factory('facebookInvite', ['$q', function ($q) {
      // TODO: add picture and url (game vs current user)
      return function () {
        var deferred = $q.defer();
        facebookConnectPlugin.appInvite({url: 'https://givdo.com'}, deferred.resolve, deferred.reject);
        return deferred.promise;
      };
    }])

    .factory('facebookGameInvite', ['$cordovaFacebook', 'GameRepo', function ($cordovaFacebook, GameRepo) {
      return function (message, title) {
        return $cordovaFacebook.showDialog({
          method: 'apprequests',
          message: message,
          title: title,
          actionType:'turn'
        }).then(function (response) {
          return GameRepo.versus({id: _.first(response.to)});
        });
      };
    }])

    .factory('facebook', ['facebookLogin', 'facebookCheckStatus', 'facebookGameInvite', 'facebookInvite', function (facebookLogin, facebookCheckStatus, facebookGameInvite, facebookInvite) {
      return {
        login: facebookLogin,
        checkStatus: facebookCheckStatus,
        gameInvite: facebookGameInvite,
        invite: facebookInvite
      };
    }]);
})();
