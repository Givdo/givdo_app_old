import { NgModule } from '@angular/core';
import { RequestOptions, XHRBackend } from '@angular/http';

import { TokenService } from '../auth/services/token';
import { HttpClient, httpClientFactory } from '../util';

import { NotificationsService } from './services/notifications';

@NgModule({
  declarations: [],

  imports: [],

  providers: [
    {
      provide: HttpClient,
      useFactory: httpClientFactory,
      deps: [XHRBackend, RequestOptions, TokenService],
    },

    NotificationsService,
  ],
})
export class NotificationsModule {}
