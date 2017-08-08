import { Action } from '@ngrx/store';

import { Notification } from './model';
import { NOTIFICATION_ARRIVED, NOTIFICATIONS_LOADED } from './actions';

import { toEntityItem } from '../../util';

export interface State {
  entities: { [id: number]: Notification },
}

export const initialState: State = {
  entities: {}
}

export function reducer(state = initialState, action: Action) {
  switch(action.type) {
    case NOTIFICATION_ARRIVED:
      let item = action.payload;

      return {
        ...state,
        entities: {
          ...state.entities,
          [item.id]: item
        }
      };

    case NOTIFICATIONS_LOADED:
      return {
        ...state,
        entities: action.payload.reduce(toEntityItem, {})
      };

    default:
      return state;
  }
}

export const getEntities = (state: State) => state.entities;
