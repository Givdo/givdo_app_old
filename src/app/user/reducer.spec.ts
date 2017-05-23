import { reducer, initialState } from './reducer';

describe('User: Reducer', () => {
  describe('undefined action', () => {
    it('returns the default state', () => {
      const action = {} as any;

      const result = reducer(undefined, action);

      expect(result).toEqual(initialState);
    });
  });
});
