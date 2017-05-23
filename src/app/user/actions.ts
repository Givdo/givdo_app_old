import { Action } from '@ngrx/store';

import { User } from './user';

export const FACEBOOK_LOGIN = 'FACEBOOK_LOGIN';

export class FacebookLoginAction implements Action {
  readonly type = FACEBOOK_LOGIN;

  constructor(public payload) { }
}

export type Actions = FacebookLoginAction;
