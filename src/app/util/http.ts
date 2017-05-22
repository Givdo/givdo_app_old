import {
  Http,
  Headers,
  Response,
  ConnectionBackend,
  RequestOptions,
  RequestOptionsArgs
} from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { AuthService } from '../auth/auth.service';

@Injectable()
export class HttpClient extends Http {

  constructor(
    protected backend: ConnectionBackend,
    protected defaultOptions: RequestOptions,
    protected auth: AuthService
  ) {
    super(backend, defaultOptions);
  }

  request(url: any, options?: RequestOptionsArgs): Observable<Response> {
    if (typeof url === 'string')
      options = this.setCustomHeaders(options);
    else
      url = this.setCustomHeaders(url);

    return super
      .request(url, options)
      .catch(this.catchAuthError);
  }

  private get token() {
    return this.auth.token;
  }

  private setCustomHeaders(options?: RequestOptionsArgs) : RequestOptionsArgs {
    if(!options) options = new RequestOptions({});
    if (!options.headers) options.headers = new Headers();

    if (this.token)
      options.headers.append('Authorization', `Token token="${this.token}"`)

    console.log(`Authorization: ${options.headers.get('Authorization')}`);

    return options;
  }

  private catchAuthError = (res: Response) => {
    if (res.status === 401 || res.status === 403) {
      console.error(res);
    }

    return Observable.throw(res);
  }
}
