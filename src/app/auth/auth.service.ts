import { Config } from 'config';

import { Store } from '@ngrx/store';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout'

import { Session } from './session';
import { State } from '../app.reducer';

import {
  LoginStartedAction,
  LoginFailureAction,
  LoginSuccessAction,
} from '../../app/auth/actions';

@Injectable()
export class AuthService {

  constructor(
    private http: Http,
    private store: Store<State>,
  ) {}

  login(facebookToken) {
    this.store.dispatch(new LoginStartedAction());

    let headers = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: headers });

    const url = `${Config.api.host}/${Config.api.version}/oauth/facebook/callback`;
    const params = { access_token: facebookToken };

    return this.http
      .post(url, params, options)
      .map(this.mapResponse)
      .map(session => new LoginSuccessAction(session))
      .catch(this.handleError);
  }

  private mapResponse = (res: Response) => {
    let data = res.json().data;

    return {
      token: data.id,
      expiresIn: 0,
      userId: data.relationships.user.data.id,
    } as Session;
  }

  private handleError = (error) => {
    let loginError;

    try {
      loginError = error.json();
    } catch(e) {
      loginError = {
        code: 'timeout',
        error: 'Oops, something went wrong! Please, try again.'
      };
    }

    this.store.dispatch(new LoginFailureAction(loginError));

    return Observable.throw(loginError || 'Server error')
  }
}
