import { reducer, State, initialState } from './reducer';

import {
  LoginSuccessAction,
  LoginSuccessPayload,
  loginSuccessPayloadFactory,
} from './actions';

describe('[Auth] reducer', () => {
  describe('with undefined action type', () => {
    it('returns the state unchanged', () => {
      const result = reducer(initialState, {} as any);

      expect(result).toEqual(initialState);
    });
  });

  describe('with LOGIN_SUCCESS type', () => {
    const payload = loginSuccessPayloadFactory.build({});
    const action = new LoginSuccessAction(payload as LoginSuccessPayload);

    it('updates state with token information', () => {
      const result = reducer(initialState, action);

      expect(result.token).toEqual(payload.token);
    });
  });
});
