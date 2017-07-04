import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/timeout';

import { State } from '../../store/reducer';
import { urlFor } from '../../util';

import {
  LoginStartedAction,
  LoginFailureAction,
  toLoginSuccessAction,
} from '../../store/auth/actions';

@Injectable()
export class AuthService {

  constructor(
    private http: Http,
    private store: Store<State>,
  ) {}

  login(facebookToken) {
    this.store.dispatch(new LoginStartedAction());

    const url = urlFor('oauth/facebook/callback');
    const params = { access_token: facebookToken };

    return this.http
      .post(url, params)
      .map(toLoginSuccessAction)
      .catch(this.handleError);
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
