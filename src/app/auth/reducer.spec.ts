import { reducer, State, initialState } from './reducer';

import { Session } from './session';
import { User } from '../user/user';
import { ApiError } from '../util/error';

import {
  LoginFailureAction,
  LOGOUT_RECEIVED,
  LoginInProcessAction,
  UserAuthenticatedAction,
  AuthTokenExpiredAction,
  FacebookNotAuthorizedAction
} from './actions';


describe('[Auth] reducer', () => {
  let user = {
    id: '123',
    uid: '123',
    name: 'Harry Potter',
    image: 'my-image',
    cover: 'my-cover',
    email: 'email@example.com',
  } as User;

  function buildState(params) {
    return Object.assign({}, initialState, params);
  }

  describe('with undefined action', () => {
    it('returns the state unchanged', () => {
      const action = {} as any;
      let state = {
        error: { code: '123', error: 'some error'},
        session: {},
        loginInProcess: true
      } as State;

      const result = reducer(state, action);

      expect(result).toEqual(state);
    });
  });

  describe('with LOGIN_IN_PROCESS action', () => {
    it('updates loginInProcess as specified in the payload', () => {
      const actionTrue = new LoginInProcessAction(true);
      const actionFalse = new LoginInProcessAction(false);

      const resultTrue = reducer(undefined, actionTrue);
      const resultFalse = reducer(undefined, actionFalse);

      expect(resultTrue.loginInProcess).toBeTruthy();
      expect(resultFalse.loginInProcess).toBeFalsy();
    });
  });

  describe('with LOGOUT_RECEIVED action', () => {
    it('returns the initial state', () => {
      const action = {
        type: LOGOUT_RECEIVED,
        payload: {}
      };

      const result = reducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });

  describe('with USER_AUTHENTICATED action', () => {
    it('sets loginInProcess to false', () => {
      const payload = {
        user: user,
        expiresIn: '1234',
        token: 'some-fancy-token',
      } as Session;

      const action = new UserAuthenticatedAction(payload);

      const result = reducer(undefined, action);

      expect(result.loginInProcess).toBeFalsy();
    });

    it('sets the session', () => {
      const payload = {
        user: user,
        expiresIn: '1234',
        token: 'some-fancy-token',
      } as Session;

      const action = new UserAuthenticatedAction(payload);

      const result = reducer(undefined, action);

      expect(result.session).toEqual(payload);
    });
  });

  describe('with LOGIN_FAILURE action', () => {
    it('sets loginInProcess to false', () => {
      const state = buildState({ loginInProcess: true });

      const payload = {
        code: 'auth',
        error: 'Some error message'
      };

      const action = new LoginFailureAction(payload);
      const result = reducer(state, action);

      expect(result.loginInProcess).toBeFalsy();
    });

    it('returns the state with the error in the payload', () => {
      const payload = {
        code: 'auth',
        error: 'Some error message'
      } as ApiError;

      const action = new LoginFailureAction(payload);

      const result = reducer(undefined, action);

      expect(result).toEqual({
        session: null,
        error: payload,
        loginInProcess: false,
      });
    });
  });

  describe('with AUTH_TOKEN_EXPIRED action', () => {
    it('returns the state with the error in the payload', () => {
      const payload = {
        code: 'toke-expired',
        error: 'Some error message',
      };

      const action = new AuthTokenExpiredAction(payload);

      const result = reducer(undefined, action);

      expect(result).toEqual({
        session: null,
        error: action.payload,
        loginInProcess: false,
      });
    });
  });

  describe('with FACEBOOK_AUTHORIZATION_FAILED action', () => {
    it('sets loginInProcess to false', () => {
      const state = { loginInProcess: true } as State;
      const action = new FacebookNotAuthorizedAction('error');

      const result = reducer(state, action);

      expect(result.loginInProcess).toBeFalsy();
    });

    it('sets error to the message in the payload', () => {
      const action = new FacebookNotAuthorizedAction('error');

      const result = reducer(undefined, action);

      expect(result.error).toEqual('error');
    });
  });
});
