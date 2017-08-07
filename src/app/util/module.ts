import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions, XHRBackend } from '@angular/http';

import { HttpClient } from './http';

import { AuthService } from '../auth/auth.service';

@NgModule({
  declarations: [],

  imports: [],

  providers: [
    {
      provide: HttpClient,
      deps: [XHRBackend, RequestOptions, AuthService],
      useFactory: (backend: XHRBackend, options: RequestOptions, auth: AuthService) => {
        return new HttpClient(backend, options, auth);
      }
    },
  ],
})
export class UtilModule {}
