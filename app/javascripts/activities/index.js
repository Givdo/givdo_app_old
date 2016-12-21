import 'angular';

import routes from './routes';
import ActivitiesController from './activities.controller';

angular
  .module('givdo.activities', [])
  .config(routes)
  .controller('ActivitiesController', ActivitiesController);
