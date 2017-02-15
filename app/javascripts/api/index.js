import 'angular';
import 'angular-json-api-client';

import OAuthRepository from './oauth.repository';
import CauseRepository from './cause.repository';
import DeviceRepository from './device.repository';
import GameRepository from './game.repository';
import UserRepository from './user.repository';
import NotificationRepository from './notification.repository';
import OrganizationRepository from './organization.repository';

angular
  .module('givdo.api', ['json-api-client'])
  .factory('OAuthRepository', OAuthRepository)
  .factory('CauseRepository', CauseRepository)
  .factory('DeviceRepository', DeviceRepository)
  .factory('GameRepository', GameRepository)
  .service('NotificationRepository', NotificationRepository)
  .factory('OrganizationRepository', OrganizationRepository)
  .factory('UserRepository', UserRepository);
