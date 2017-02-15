import 'angular';

import routes from './routes';
import FriendController from './friend.controller';
import FriendsController from './friends.controller';

angular
  .module('givdo.friends', [])
  .config(routes)
  .controller('FriendController', FriendController)
  .controller('FriendsController', FriendsController);
