import { Action } from '@ngrx/store';
import * as Factory from 'factory.ts'


// NotificationArrivedAction
// =========================
export const NOTIFICATION_ARRIVED = '[Notifications] NOTIFICATION_ARRIVED';

export interface NotificationArrivedPayload {

}

export class NotificationArrivedAction implements Action {
  readonly type = NOTIFICATION_ARRIVED;

  constructor(public payload: any) {}
}


// NotificationsLoadedAction
// =========================

export const NOTIFICATIONS_LOADED = '[Notifications] NOTIFICATIONS_LOADED';

export class NotificationsLoadedAction implements Action {
  readonly type = NOTIFICATIONS_LOADED;

  constructor(public payload: Array<any>) {}
}
