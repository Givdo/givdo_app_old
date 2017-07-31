import { toMostRecentFirst } from './common';

describe('[Mappers] toMostRecentFirst', () => {
  it('returns the most recent items first', () => {
    const collection = [
      { id: 1, createAt: '2016-06-20T13:51:45.324Z' },
      { id: 2, createAt: '2016-06-21T13:51:45.324Z' },
      { id: 3, createAt: '2016-06-22T13:51:45.324Z' },
    ];

    const result = toMostRecentFirst(collection);

    expect(result[0].id).toEqual(3);
    expect(result[1].id).toEqual(2);
    expect(result[2].id).toEqual(1);
  })
})
