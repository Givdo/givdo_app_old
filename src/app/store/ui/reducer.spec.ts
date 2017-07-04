import { Action } from '@ngrx/store';

import {
  reducer,
  State,
  initialState,
  getError,
  getLoading,
  getCurrentUserId,
} from './reducer';

import {
  LoginFailureAction,
  LoginStartedAction,
  LoginSuccessAction,
  LoginSuccessPayload,
  loginSuccessPayloadFactory,
} from '../auth/actions';


describe('[UI] reducer', () => {
  describe('with undefined action type', () => {
    it('returns the state unchanged', () => {
      const result = reducer(initialState, {} as Action);

      expect(result).toEqual(initialState);
    })
  })

  describe('with LOGIN_STARTED action type', () => {
    const action = new LoginStartedAction();

    it('sets loading property to true', () => {
      const result = reducer(initialState, action);

      expect(result.loading).toBeTruthy();
    })

    it('keeps other properties unchanged', () => {
      const result = reducer(initialState, action);

      expect(result.error).toBeUndefined();
      expect(result.userId).toBeUndefined();
      expect(result.organizationId).toBeUndefined();
    })
  })

  describe('with LOGIN_SUCCESS action type', () => {
    const payload = loginSuccessPayloadFactory.build({});
    const action = new LoginSuccessAction(payload as LoginSuccessPayload);

    it('sets loading property to false', () => {
      const result = reducer(initialState, action);

      expect(result.loading).toBeFalsy();
    })

    it('sets userId property', () => {
      const result = reducer(initialState, action);

      expect(result.userId).toEqual(payload.user.id);
    })

    it('sets organizationId property', () => {
      const result = reducer(initialState, action);

      expect(result.organizationId).toEqual(payload.organization.id);
    })

    it('keeps other properties unchanged', () => {
      const result = reducer(initialState, action);

      expect(result.error).toBeUndefined();
    })
  })

  describe('with LOGIN_FAILURE type', () => {
    it('sets the error property', () => {
      const action = new LoginFailureAction({
        message: 'OMG! Aliens!',
      });

      const result = reducer(initialState, action);

      expect(result.error).toEqual('OMG! Aliens!');
    })
  })
});

describe('[UI] getLoading state selector', () => {
  it('returns the loading value', () => {
    const state = Object.assign({}, initialState, { loading: true });

    const result = getLoading(state as State);

    expect(result).toBeTruthy();
  })
});

describe('[UI] getError state selector', () => {
  it('returns the error value', () => {
    const state = Object.assign({}, initialState, { error: 'OMG! Aliens!' });

    const result = getError(state as State);

    expect(result).toEqual('OMG! Aliens!');
  })
});

describe('[UI] getCurrentUserId state selector', () => {
  it('returns the value for userId', () => {
    const state = Object.assign({}, initialState, { userId: 123 });

    const result = getCurrentUserId(state as State);

    expect(result).toEqual(123);
  })
});
