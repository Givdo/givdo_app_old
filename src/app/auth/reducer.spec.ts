import { reducer, State, initialState } from './reducer';

import { ApiError } from '../util/error';

import {
  LoginStartedAction,
  LoginSuccessAction,
  LoginFailureAction,
} from './actions/login';

import {
  FacebookNotAuthorizedAction,
  FacebookAuthorizationStartedAction
} from './actions/facebook';


describe('[Auth] reducer', () => {
  function buildState(params) {
    return Object.assign({}, initialState, params);
  }

  describe('with undefined action', () => {
    it('returns the state unchanged', () => {
      let state = buildState({});

      const result = reducer(state, {} as any);

      expect(result).toEqual(state);
    });
  });

  describe('with LOGIN_STARTED action', () => {
    it('sets loading to true', () => {
      const action = new LoginStartedAction();

      const result = reducer(undefined, action);

      expect(result.loading).toBeTruthy();
    });
  });

  describe('with LOGIN_SUCCESS action', () => {
    let payload = {
      userId: 123,
      token: 'super-token',
      expiresIn: 1234,
    };

    it('updates loading to false', () => {
      const action = new LoginSuccessAction(payload);

      const result = reducer(undefined, action);

      expect(result.loading).toBeFalsy();
    });

    it('updates token as specified in the payload', () => {
      const action = new LoginSuccessAction(payload);

      const result = reducer(undefined, action);

      expect(result.token).toEqual(payload.token);
    });

    it('updates userId as specified in the payload', () => {
      const action = new LoginSuccessAction(payload);

      const result = reducer(undefined, action);

      expect(result.userId).toEqual(payload.userId);
    });

    it('updates expiresIn as specified in the payload', () => {
      const action = new LoginSuccessAction(payload);

      const result = reducer(undefined, action);

      expect(result.expiresIn).toEqual(payload.expiresIn);
    });
  });

  describe('with LOGIN_FAILURE action', () => {
    let payload = {
      code: 'auth',
      error: 'Some error message'
    } as ApiError;

    it('updates loading to false', () => {
      const state = buildState({ loading: true });
      const action = new LoginFailureAction(payload);

      const result = reducer(state, action);

      expect(result.loading).toBeFalsy();
    });

    it('updates error as specified in the payload', () => {
      const action = new LoginFailureAction(payload);

      const result = reducer(undefined, action);

      expect(result.error).toEqual(payload);
    });
  });

  describe('with FACEBOOK_AUTHORIZATION_STARTED action', () => {
    it('updates loading to true', () => {
      const state = buildState({ loading: false });
      const action = new FacebookAuthorizationStartedAction();

      const result = reducer(state, action);

      expect(result.loading).toBeTruthy();
    });
  });

  describe('with FACEBOOK_AUTHORIZATION_FAILED action', () => {
    it('updates loading to false', () => {
      const state = { loading: true } as State;
      const action = new FacebookNotAuthorizedAction('error');

      const result = reducer(state, action);

      expect(result.loading).toBeFalsy();
    });

    it('updates error to the message in the payload', () => {
      const action = new FacebookNotAuthorizedAction('error');

      const result = reducer(undefined, action);

      expect(result.error).toEqual('error');
    });
  });
});
