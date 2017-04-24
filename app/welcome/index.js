import routes from './routes';
import WelcomeController from './welcome-controller';

const welcomeModule = angular.module('givdo.welcome', []);

angular.module('givdo.welcome')
  .config(routes)
  .controller('WelcomeController', ['$state', '$ionicPopup', WelcomeController]);

export default welcomeModule.name;
