import 'angular';

import routes from './routes';
import WelcomeController from './welcome.controller';

angular
  .module('givdo.welcome', [])
  .config(routes)
  .controller('WelcomeController', WelcomeController);
