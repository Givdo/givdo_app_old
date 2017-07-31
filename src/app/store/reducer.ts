import { Config } from 'config';

import { createSelector } from 'reselect';
import { ActionReducer } from '@ngrx/store';
import { compose } from '@ngrx/core/compose';
import { combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';

import * as ui from './ui/reducer';
import * as auth from './auth/reducer';
import * as notifications from './notifications/reducer';

export interface State {
  ui: ui.State,
  auth: auth.State,
  notifications: notifications.State,
}

const reducers = {
  ui: ui.reducer,
  auth: auth.reducer,
  notifications: notifications.reducer,
}

const developmentReducer: ActionReducer<State> = compose(storeFreeze, combineReducers)(reducers);
const productionReducer: ActionReducer<State> = combineReducers(reducers);

export function reducer(state: any, action: any) {
  if (Config.debug) {
    return productionReducer(state, action);
  } else {
    return developmentReducer(state, action);
  }
}

export const getUiState = (state: State) => state.ui;
export const getUiError = createSelector(getUiState, ui.getError);
export const getUiLoading = createSelector(getUiState, ui.getLoading);
export const getCurrentUserId = createSelector(getUiState, ui.getCurrentUserId);

export const getAuthState = (state: State) => state.auth;

export const getNotificationsState = (state: State) => state.notifications;
export const getNotificationsEntities = createSelector(getNotificationsState, notifications.getEntities);
