import 'angular';

import './views/index.html';
import './views/show.html';

routes.$inject = ['$stateProvider'];

function routes($stateProvider) {
  $stateProvider
  .state('friends', {
    url: '/friends',
    parent: 'app',
    views: {
      'friends-content': {
        controller: 'FriendsController as vm',
        templateUrl: 'friends/views/index.html',
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
        templateUrl: 'friends/views/show.html',
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

export default routes;
