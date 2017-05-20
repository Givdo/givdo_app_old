import { Config } from 'config';

import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';

import { compose } from '@ngrx/core/compose';
import { storeFreeze } from 'ngrx-store-freeze';
import { combineReducers } from '@ngrx/store';

import * as auth from './auth/reducer';
import * as user from './user/reducer';

export interface State {
  auth: auth.State,
  user: user.State,
}

const reducers = {
  auth: auth.reducer,
  user: user.reducer,
};

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (Config.debug) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}


export const getAuthState = (state: State) => state.auth;
export const getUserState = (state: State) => state.user;

export const getAuthToken = createSelector(getAuthState, auth.getToken);
export const getAuthError = createSelector(getAuthState, auth.getError);
export const getLoginInProcess = createSelector(getAuthState, auth.getLoading);
