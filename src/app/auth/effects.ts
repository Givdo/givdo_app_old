import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';

import { AuthService } from './auth.service';

import { FACEBOOK_AUTHORIZED } from './actions';

@Injectable()
export class AuthEffects {
  @Effect()
  login$: Observable<Action> = this.actions$
    .ofType(FACEBOOK_AUTHORIZED)
    .map(toPayload)
    .switchMap(res => {
      return this.auth.login(res.authResponse.accessToken);
    });

  constructor(
    private auth: AuthService,
    private actions$: Actions,
  ) { }
}
