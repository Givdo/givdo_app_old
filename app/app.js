import 'angular';
import 'ionic';
import 'ionic-angular';
import 'angular-animate';
import 'angular-sanitize';

import uirouter from 'angular-ui-router';

import 'app.scss';
import welcome from 'welcome';

angular
  .module('givdo', [
    'ionic',
    uirouter,
    welcome,
  ]);
