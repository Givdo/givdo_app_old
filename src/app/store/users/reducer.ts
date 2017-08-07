import { Action } from '@ngrx/store';

import { User } from './model';

export interface State {
  entities: { [id: number]: User },
}

export const initialState : State = {
  entities: {}
}

export function reducer(state = initialState, action: Action) {
  switch(action.type) {
    default:
      return state;
  }
}
