import { reducer, State, initialState } from './reducer';

describe('[User] reducer', () => {
  describe('with undefined action type', () => {
    it('returns state unchanged', () => {
      const result = reducer(initialState, {} as any);

      expect(result).toEqual(initialState);
    })
  })
})
