import { Action } from '@ngrx/store';

import { Session } from './session';
import { ApiError } from '../util/error';

import {
  LOGIN_FAILURE,
  LOGOUT_RECEIVED,
  LOGIN_IN_PROCESS,
  USER_AUTHENTICATED,
  AUTH_TOKEN_EXPIRED,
  FACEBOOK_NOT_AUTHORIZED
} from './actions';


export interface State {
  loginInProcess: boolean,
  error: ApiError | string,
  session: Session,
}

export const initialState: State = {
  error: null,
  session: null,
  loginInProcess: false,
}

export function reducer(state = initialState, action: Action) {
  switch(action.type) {
    case LOGIN_IN_PROCESS:
      return Object.assign({}, state, {
        loginInProcess: action.payload,
      });

    case USER_AUTHENTICATED:
      return Object.assign({}, state, {
        error: null,
        loginInProcess: false,
        session: action.payload,
      });

    case LOGOUT_RECEIVED:
      return Object.assign({}, state, initialState);

    case LOGIN_FAILURE:
    case AUTH_TOKEN_EXPIRED:
      return Object.assign({}, state, {
        session: null,
        loginInProcess: false,
        error: action.payload,
      });

    case FACEBOOK_NOT_AUTHORIZED:
      return Object.assign({}, state, {
        error: action.payload,
        loginInProcess: false,
      });

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getSession = (state: State) => state.session;
export const getLoginInProcess = (state: State) => state.loginInProcess;
