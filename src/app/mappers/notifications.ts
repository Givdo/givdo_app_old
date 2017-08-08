import * as _ from 'lodash';

import { NotificationsLoadedAction } from '../store/notifications/actions';

export const toNotifications = (state) => {
  return _.values(state.entities);
}

export const toNotificationsLoadedAction = (data) => {
  return new NotificationsLoadedAction(
    _.map(data, (v: any) => {
      return {
        id: v.id, ...v.attributes
      };
    })
  );
}
