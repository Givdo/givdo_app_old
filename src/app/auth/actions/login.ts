import { Action } from '@ngrx/store';

import { ApiError } from '../../util/error';
import { Session } from '../models/session';

export const LOGIN_STARTED = '[Auth] LOGIN_STARTED';
export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
export const LOGIN_FAILURE = '[Auth] LOGIN_FAILURE';


export class LoginStartedAction implements Action {
  readonly type = LOGIN_STARTED;

  constructor() {}
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: Session) {}
}

export class LoginFailureAction implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: ApiError | null) {}
}

export type Actions
  = LoginStartedAction
    | LoginSuccessAction
    | LoginFailureAction
