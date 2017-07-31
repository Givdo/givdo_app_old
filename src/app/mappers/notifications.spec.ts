import { toNotifications, toNotificationsLoadedAction } from './notifications';

import { NOTIFICATIONS_LOADED } from '../store/notifications/actions';

describe('[Mappers] toNotifications', () => {
  it('maps entities hash into an array of notifications', () => {
    const state = {
      entities: {
        1: 'a',
        2: 'b',
      }
    };

    const result = toNotifications(state);

    expect(result).toContain('a', 'b');
  })
})

describe('[Mappers] toNotificationsLoadedAction', () => {
  const data = {
    id: 1,
    attributes: {
      foo: 'bar',
      bar: 'foo',
    }
  };

  const result = toNotificationsLoadedAction(data);

  it('returns an action of type NOTIFICATIONS_LOADED', () => {
    expect(result.type).toEqual(NOTIFICATIONS_LOADED);
  })

  it('')
})
