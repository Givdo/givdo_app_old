import { Action } from '@ngrx/store';

import { ApiError } from '../util/error';

import {
  Actions,
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FACEBOOK_NOT_AUTHORIZED,
  FACEBOOK_AUTHORIZATION_STARTED,
} from './actions';


export interface State {
  loading: boolean,
  token: string | null,
  userId: number | null,
  expiresIn: number | null,
  error: ApiError | string,
}

export const initialState : State = {
  loading: false,
  token: null,
  userId: null,
  expiresIn: null,
  error: null,
}

export function reducer(state = initialState, action: Actions) {
  switch(action.type) {
    case LOGIN_STARTED:
    case FACEBOOK_AUTHORIZATION_STARTED:
      return Object.assign({}, state, { loading: true });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        token: action.payload.token,
        userId: action.payload.userId,
        expiresIn: action.payload.expiresIn,
      });

    case LOGIN_FAILURE:
      return Object.assign({}, state, { loading: false, error: action.payload });

    case FACEBOOK_NOT_AUTHORIZED:
      return Object.assign({}, state, {
        error: action.payload,
        loading: false,
      });

    default:
      return state;
  }
}

export const getToken = (state: State) => state.token;
export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
