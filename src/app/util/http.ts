import {
  Http,
  Headers,
  Response,
  ConnectionBackend,
  RequestOptions,
  XHRBackend,
  RequestOptionsArgs
} from '@angular/http';

import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TokenService } from '../auth/services/token';

export const httpClientFactory = (backend: XHRBackend, options: RequestOptions, token: TokenService) => {
  console.log('here')
  return new HttpClient(backend, options, token);
}

@Injectable()
export class HttpClient extends Http {

  constructor(
    protected backend: ConnectionBackend,
    protected defaultOptions: RequestOptions,
    protected token: TokenService,
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

  private setCustomHeaders(options?: RequestOptionsArgs) : RequestOptionsArgs {
    if(!options) options = new RequestOptions({});
    if (!options.headers) options.headers = new Headers();

    if (this.token.get())
      options.headers.append('Authorization', `Token token="${this.token.get()}"`)

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
