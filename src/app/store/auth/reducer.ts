import { Action } from '@ngrx/store';

import { Token } from './model';
import { LOGIN_SUCCESS, FACEBOOK_NOT_AUTHORIZED } from './actions';

export interface State {
  token: Token,
}

export const initialState : State = {
  token: undefined,
}

export function reducer(state = initialState, action: Action) {
  switch(action.type) {
    case LOGIN_SUCCESS:
      return Object.assign({}, state, { token: action.payload.token });

    default:
      return state;
  }
}
