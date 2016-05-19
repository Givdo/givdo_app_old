(function () {
  'use strict';

  angular
    .module('givdo.facebook', ['givdo.api', 'ngCordova'])
    .factory('facebookAuth', facebookAuth)
    .factory('facebookCheckStatus', facebookCheckStatus)
    .factory('facebookLogin', facebookLogin)
    .factory('facebookInvite', facebookInvite)
    .factory('facebookGameInvite', facebookGameInvite)
    .factory('facebook', facebook);


    facebookAuth.$inject = ['givdo', '$q'];

    function facebookAuth(givdo, $q) {
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

        return givdo.oauth.callback(data);
      };
    }

    facebookCheckStatus.$inject = ['$cordovaFacebook', 'facebookAuth'];

    function facebookCheckStatus($cordovaFacebook, facebookAuth) {
      return function () {
        return $cordovaFacebook.getLoginStatus().then(facebookAuth);
      };
    }

    facebookLogin.$inject = ['$cordovaFacebook', 'facebookAuth'];

    function facebookLogin($cordovaFacebook, facebookAuth) {
      return function () {
        return $cordovaFacebook.login(['email', 'user_friends', 'user_about_me']).then(facebookAuth);
      };
    }

    facebookInvite.$inject = ['$q'];

    function facebookInvite($q) {
      // TODO: add picture and url (game vs current user)
      return function () {
        var deferred = $q.defer();
        var options = { url: 'https://fb.me/603544463136105' };
        facebookConnectPlugin.appInvite(options, deferred.resolve, deferred.reject);
        return deferred.promise;
      };
    }

    facebookGameInvite.$inject = ['$cordovaFacebook', 'givdo'];

    function facebookGameInvite($cordovaFacebook, givdo) {
      return function (message, title) {
        return $cordovaFacebook.showDialog({
          method: 'apprequests',
          message: message,
          title: title,
          actionType:'turn'
        }).then(function (response) {
          return givdo.game.versus({uid: _.first(response.to)});
        });
      };
    }

    facebook.$inject = [
      'facebookLogin',
      'facebookCheckStatus',
      'facebookGameInvite',
      'facebookInvite',
    ];

    function facebook(facebookLogin, facebookCheckStatus, facebookGameInvite, facebookInvite) {
      return {
        login: facebookLogin,
        checkStatus: facebookCheckStatus,
        gameInvite: facebookGameInvite,
        invite: facebookInvite
      };
    }
})();
