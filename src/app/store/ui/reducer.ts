import { Action } from '@ngrx/store';

import {
  LOGIN_STARTED,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  FACEBOOK_NOT_AUTHORIZED,
} from '../auth/actions';

export interface State {
  userId: number,
  organizationId: number,
  error?: string,
  loading: boolean,
}

export const initialState: State = {
  loading: false,
  userId: undefined,
  organizationId: undefined,
}

export function reducer(state = initialState, action: Action) {
  switch(action.type) {
    case LOGIN_STARTED:
      return Object.assign({}, state, { loading: true });

    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        userId: action.payload.user.id,
        organizationId: action.payload.organization.id,
      });

    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        error: action.payload.message,
      });

    case FACEBOOK_NOT_AUTHORIZED:
      return Object.assign({}, state, {
        error: action.payload,
      });

    default:
      return state;
  }
}

export const getError = (state: State) => state.error;
export const getLoading = (state: State) => state.loading;
export const getCurrentUserId = (state: State) => state.userId;
