import 'angular';

import routes from './routes';
import NotificationsController from './notifications.controller';

angular
  .module('givdo.notifications', [])
  .config(routes)
  .controller('NotificationsController', NotificationsController);
