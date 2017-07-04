import { Action } from '@ngrx/store';
import * as Factory from 'factory.ts'
import { Response } from '@angular/http';
import { FacebookLoginResponse } from '@ionic-native/facebook';

import { toData } from '../../util/response';
import { Token, tokenFactory } from './model';
import { User, userFactory } from '../users/model';
import { Organization, organizationFactory } from '../organizations/model';


// LoginStartedAction
// ==================
export const LOGIN_STARTED = '[Auth] LOGIN_STARTED';

export class LoginStartedAction implements Action {
  readonly type = LOGIN_STARTED;
}

// LoginSuccessAction
// ==================
export const LOGIN_SUCCESS = '[Auth] LOGIN_SUCCESS';

export interface LoginSuccessPayload {
  token: Token,
  user: User,
  organization?: Organization,
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: LoginSuccessPayload) {}
}

export const loginSuccessPayloadFactory = Factory.makeFactory<LoginSuccessPayload>({
  token: tokenFactory.build({}),
  user: userFactory.build({}),
  organization: organizationFactory.build({}),
})

export const toLoginSuccessAction = (res: Response) => {
  const data = toData(res);
  const payload = loginSuccessPayloadFactory.build(data.attributes);

  return new LoginSuccessAction(payload);
}

// LoginFailureAction
// ==================
export const LOGIN_FAILURE = '[Auth] LOGIN_FAILURE';

export interface LoginFailurePayload {
  code?: string,
  message: string,
}

export class LoginFailureAction implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: LoginFailurePayload) {}
}

// LoginFinishedAction and payload
// ===============================
export const LOGIN_FINISHED = '[Auth] LOGIN_FINISHED';

export interface LoginFinishedPayload {
  userId: number,
  organizationId: number,
}

export class LoginFinishedAction implements Action {
  readonly type = LOGIN_FINISHED;

  constructor(public payload: LoginFinishedPayload) {}
}

// FacebookAuthorizedAction
// ========================
export const FACEBOOK_AUTHORIZED = '[Auth] FACEBOOK_AUTHORIZED';

export class FacebookAuthorizedAction implements Action {
  readonly type = FACEBOOK_AUTHORIZED;

  constructor(public payload: FacebookLoginResponse) {}
}

// FacebookNotAuthorizedAction
// ===========================
export const FACEBOOK_NOT_AUTHORIZED = '[Auth] FACEBOOK_NOT_AUTHORIZED';

export class FacebookNotAuthorizedAction implements Action {
  readonly type = FACEBOOK_NOT_AUTHORIZED;

  constructor(public payload: string) {}
}

// FacebookAuthorizationStartedAction
// ==================================
export const FACEBOOK_AUTHORIZATION_STARTED = '[Auth] FACEBOOK_AUTHORIZATION_STARTED';

export class FacebookAuthorizationStartedAction implements Action {
  readonly type = FACEBOOK_AUTHORIZATION_STARTED;

  constructor() {}
}
