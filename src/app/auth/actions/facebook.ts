import { Action } from '@ngrx/store';
import { FacebookLoginResponse } from '@ionic-native/facebook';

import { ApiError } from '../../util/error';

export const FACEBOOK_AUTHORIZED = '[Auth] FACEBOOK_AUTHORIZED';
export const FACEBOOK_NOT_AUTHORIZED = '[Auth] FACEBOOK_NOT_AUTHORIZED';
export const FACEBOOK_AUTHORIZATION_STARTED = '[Auth] FACEBOOK_AUTHORIZATION_STARTED';

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
  = FacebookAuthorizedAction
    | FacebookNotAuthorizedAction
    | FacebookAuthorizationStartedAction
