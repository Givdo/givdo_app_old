import { Action } from '@ngrx/store';
import { FacebookLoginResponse } from '@ionic-native/facebook';

import { ApiError } from '../util/error';
import { Session } from './session';

export const LOGIN_USER = 'LOGIN_USER'
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_CANCELED = 'LOGIN_CANCELED';
export const LOGOUT_RECEIVED = 'LOGOUT_RECEIVED';
export const LOGIN_IN_PROCESS = 'LOGIN_IN_PROCESS';
export const USER_AUTHENTICATED = 'USER_AUTHENTICATED';
export const AUTH_TOKEN_EXPIRED = 'AUTH_TOKEN_EXPIRED';
export const FACEBOOK_AUTHORIZED = 'FACEBOOK_AUTHORIZED';
export const FACEBOOK_NOT_AUTHORIZED = 'FACEBOOK_NOT_AUTHORIZED';

export class LoginUserAction implements Action {
  readonly type = LOGIN_USER;

  constructor(public payload: FacebookLoginResponse) {}
}

export class LoginFailureAction implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: ApiError | null) {}
}

export class LoginCanceledAction implements Action {
  readonly type = LOGIN_CANCELED;

  constructor() {}
}

export class LoginInProcessAction implements Action {
  readonly type = LOGIN_IN_PROCESS;

  constructor(public payload: boolean) {}
}

export class UserAuthenticatedAction implements Action {
  readonly type = USER_AUTHENTICATED;

  constructor(public payload: Session) {}
}

export class AuthTokenExpiredAction implements Action {
  readonly type = AUTH_TOKEN_EXPIRED;

  constructor(public payload: ApiError) {}
}

export class FacebookAuthorizedAction implements Action {
  readonly type = FACEBOOK_AUTHORIZED;

  constructor(public payload: FacebookLoginResponse) {}
}

export class FacebookNotAuthorizedAction implements Action {
  readonly type = FACEBOOK_NOT_AUTHORIZED;

  constructor(public payload: string | ApiError) {}
}
