import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { urlFor } from '../../util';
// import { NotificationsLoadedAction } from '../store/notifications/actions';

@Injectable()
export class NotificationsService {

  constructor(
    private http: Http,
  ) {}

  load() {
    const url = urlFor('notifications');

    // return this.http
    //   .get(url)
    //   .map(response => {
    //     console.log(response.json());
    //     return new NotificationsLoadedAction(response.json());
    //   })
    //   .catch(error => Observable.throw('Error'));
  }
}
