import 'angular';

import bootstrap from './bootstrap';
import AuthService from './auth.service';
import SessionService from './session.service';
import SessionInterceptor from './session.interceptor';

angular
  .module('givdo.auth', [])
  .config(bootstrap.interceptors)
  .run(bootstrap.protectRoutes)
  .factory('sessionService', SessionService)
  .factory('sessionInterceptor', SessionInterceptor)
  .service('authService', AuthService);
