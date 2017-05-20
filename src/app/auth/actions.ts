import { Action } from '@ngrx/store';
import { FacebookLoginResponse } from '@ionic-native/facebook';

import { ApiError } from '../util/error';
import { Session } from './session';

export const LOGIN_STARTED = '[Auth] LOGIN_STARTED';
export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';
export const LOGIN_FAILURE = '[Auth] LOGIN_FAILURE';
export const FACEBOOK_AUTHORIZED = '[Auth] FACEBOOK_AUTHORIZED';
export const FACEBOOK_NOT_AUTHORIZED = '[Auth] FACEBOOK_NOT_AUTHORIZED';
export const FACEBOOK_AUTHORIZATION_STARTED = '[Auth] FACEBOOK_AUTHORIZATION_STARTED'


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

export class FacebookAuthorizedAction implements Action {
  readonly type = FACEBOOK_AUTHORIZED;

  constructor(public payload: FacebookLoginResponse) {}
}

export class FacebookNotAuthorizedAction implements Action {
  readonly type = FACEBOOK_NOT_AUTHORIZED;

  constructor(public payload: string | ApiError) {}
}

export class FacebookAuthorizationStartedAction implements Action {
  readonly type = FACEBOOK_AUTHORIZATION_STARTED;

  constructor() {}
}

export type Actions
  = LoginStartedAction
    | LoginSuccessAction
    | LoginFailureAction
    | FacebookAuthorizedAction
    | FacebookNotAuthorizedAction
    | FacebookAuthorizationStartedAction
