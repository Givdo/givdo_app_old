import { NgModule } from '@angular/core';
import { Http, RequestOptions, XHRBackend } from '@angular/http';

import { httpClientFactory } from '../util';
import { TokenService } from '../auth/services/token';

import { NotificationsService } from './services/notifications';

@NgModule({
  declarations: [],

  imports: [],

  providers: [
    {
      provide: Http,
      useFactory: httpClientFactory,
      deps: [XHRBackend, RequestOptions, TokenService],
    },

    NotificationsService,
  ],
})
export class NotificationsModule {}
