import _ from 'lodash';
import config from 'config';
import events from 'events';
import routes from './routes';
import bootstrap from './bootstrap';

// Workaround for angular-json-api-client not finding _.
window._ = _;

import 'ionic';
import 'ngCordova';
import 'ng-cordova-oauth';
import 'angular-animate';
import 'angular-sanitize';
import 'angular-ui-router';
import 'angular-local-storage';
import 'angular-json-api-client';

angular
  .module('givdo.core', [
    'ionic',
    'ui.router',
    'ngCordova',
    'ngCordovaOauth',
    'LocalStorageModule',
  ])
  .constant('config', config)
  .constant('events', events)
  .run(bootstrap.platform)
  .config(routes)
  .config(bootstrap.ionic)
  .config(bootstrap.storage)
  .config(bootstrap.httpService);
