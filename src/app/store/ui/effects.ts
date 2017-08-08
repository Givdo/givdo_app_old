import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import 'rxjs/add/operator/switchMap';

import { AuthService } from '../../auth';
import { FACEBOOK_AUTHORIZED } from './actions';

@Injectable()
export class AuthEffects {
  @Effect()
  error$: Observable<Action> = this.actions$
    .ofType(FACEBOOK_AUTHORIZED)
    .map(toPayload)
    .switchMap(res => {
      return this.auth.login(res.authResponse.accessToken);
    });

  constructor(
    private actions$: Actions,
    private auth: AuthService,
  ) { }
}
