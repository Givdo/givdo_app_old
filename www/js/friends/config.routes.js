(function() {
  'use strict';

  angular
    .module('givdo.friends')
    .config(['$stateProvider', config]);

  function config($stateProvider) {
    $stateProvider
      .state('friends', {
        url: '/friends',
        parent: 'app',
        views: {
          'friends-content': {
            controller: 'FriendsController as vm',
            templateUrl: 'templates/friends/index.html',
          },
        },
        data: {
          protected: true,
        },
        resolve: {
          friends: function(givdo) {
            return givdo.user.friends();
          },
        }
      })
      .state('friend', {
        url: '/friend/show/:friendId',
        parent: 'app',
        views: {
          'friends-content': {
            controller: 'FriendController as vm',
            templateUrl: 'templates/friends/show.html',
          },
        },
        data: {
            protected: true,
          },
          resolve: {
            friend: function(givdo, $stateParams) {
              return givdo.user.get_friend($stateParams.friendId);
            }
          }
      });
  }
})();
