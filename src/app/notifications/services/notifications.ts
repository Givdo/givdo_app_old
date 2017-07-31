import { Store } from '@ngrx/store';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';

import {
  State,
  getNotificationsState,
} from '../../store/reducer';
import { urlFor, toData } from '../../util';
import { toMostRecentFirst } from '../../mappers/common';
import { toNotifications, toNotificationsLoadedAction } from '../../mappers/notifications';


@Injectable()
export class NotificationsService {

  public notifications;

  constructor(
    private http: Http,
    private store: Store<State>,
  ) {
    this.notifications = this.store
      .select(getNotificationsState)
      .map(toNotifications)
      .map(toMostRecentFirst);
  }

  load() {
    const url = urlFor('notifications');

    this.http
      .get(url)
      .map(toData)
      .map(toNotificationsLoadedAction)
      .subscribe(action => this.store.dispatch(action));
  }

  check() {
  }
}
