import { Action } from '@ngrx/store';

export interface State {
  loading: boolean,
}

export const initialState: State = {
  loading: false,
}

export function reducer(state = initialState, action: Action) {
  switch(action.type) {
    // case
  }
}
