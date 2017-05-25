import { NgModule } from '@angular/core';
import { RequestOptions, XHRBackend } from '@angular/http';

import { AuthService } from '../auth';
import { HttpClient, httpClientFactory } from '../util';

import { NotificationsService } from './services/notifications';

@NgModule({
  declarations: [],

  imports: [
  ],

  providers: [
    {
      provide: HttpClient,
      useFactory: httpClientFactory,
      deps: [XHRBackend, RequestOptions, AuthService],
    },

    NotificationsService,
  ],
})
export class NotificationsModule {}
