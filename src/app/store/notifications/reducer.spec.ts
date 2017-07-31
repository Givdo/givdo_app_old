import { Action } from '@ngrx/store';

import {
  reducer,
  State,
  initialState,
  getEntities,
} from './reducer';

import { notificationFactory } from './model';
import { NotificationArrivedAction, NotificationsLoadedAction } from './actions';


describe('[Notifications] reducer', () => {
  describe('with undefined action type', () => {
    it('returns the state unchanged', () => {
      const result = reducer(initialState, {} as Action);

      expect(result).toEqual(initialState);
    })
  })

  describe('with NOTIFICATIONS_LOADED action type', () => {
    it('updates state with all loaded notifications', () => {
      const action = new NotificationsLoadedAction([
        notificationFactory.build({ name: 'Harry Potter' }),
        notificationFactory.build({ name: 'Ron Weasley' }),
        notificationFactory.build({ name: 'Hermione Granger' }),
      ]);

      const result = reducer(initialState, action);

      expect(result.entities[1].name).toEqual('Harry Potter');
      expect(result.entities[2].name).toEqual('Ron Weasley');
      expect(result.entities[3].name).toEqual('Hermione Granger');
    })
  })

  describe('with NOTIFICATION_ARRIVED action type', () => {
    it('appends new notification into state entities', () => {
      const state = {
        entities: {
          1: notificationFactory.build({ name: 'Ron Weasley' }),
        }
      }
      const action = new NotificationArrivedAction(
        notificationFactory.build({ id: 2, name: 'Harry Potter' })
      );

      const result = reducer(state, action as Action);

      expect(result.entities[2]).toEqual(action.payload);
    })
  })
})

describe('[Notifications] getEntities state selector', () => {
  it('returns entities hash', () => {
    const state = Object.assign({}, initialState, {
      entities: {
        1: notificationFactory.build({ name: 'Harry Potter' }),
        2: notificationFactory.build({ name: 'Ron Weasley' }),
        3: notificationFactory.build({ name: 'Hermione Granger' }),
      }
    });

    const result = getEntities(state as State);

    expect(result[1].name).toEqual('Harry Potter');
    expect(result[2].name).toEqual('Ron Weasley');
    expect(result[3].name).toEqual('Hermione Granger');
  })
})
