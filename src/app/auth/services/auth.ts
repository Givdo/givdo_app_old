import { Store } from '@ngrx/store';
import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout'

import { urlFor } from '../../util';
import { Session } from '../models/session';
import { State, getToken } from '../reducer';

import {
  LoginStartedAction,
  LoginFailureAction,
  LoginSuccessAction,
} from '../actions/login';

@Injectable()
export class AuthService {

  token = null;

  constructor(
    private http: Http,
    private store: Store<State>,
  ) {
    store.select(getToken).subscribe(token => this.token = token);
  }

  login(facebookToken) {
    this.store.dispatch(new LoginStartedAction());

    const url = urlFor('oauth/facebook/callback');
    const params = { access_token: facebookToken };

    return this.http
      .post(url, params)
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
