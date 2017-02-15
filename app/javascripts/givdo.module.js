import 'angular';

import './core';
import './api';
import './auth';
import './welcome';
import './friends';
import './activities';
import './notifications';

angular.module('givdo', [
  'givdo.core',
  'givdo.api',
  'givdo.auth',
  // 'givdo.quiz',
  // 'givdo.user',
  // 'givdo.ui',
  'givdo.welcome',
  'givdo.friends',
  'givdo.activities',
  // 'givdo.notifications',
  'givdo.templates',
]);
