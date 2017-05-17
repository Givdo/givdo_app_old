import { ActionReducer, Action } from '@ngrx/store';

import { User } from './user';
import * as user from './actions';

export interface State {
  currentUserId: number | null,
}

export const initialState: State = {
  currentUserId: null,
}

export function reducer(state = initialState, action: user.Actions) {
  switch(action.type) {
    case user.FACEBOOK_LOGIN:
      return [];
    default:
      return state;
  }
}
