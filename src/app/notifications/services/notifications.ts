import { Injectable } from '@angular/core';

import { urlFor, HttpClient } from '../../util';

@Injectable()
export class NotificationsService {

  constructor(
    private http: HttpClient,
  ) {}

  load() {
    return this.http
      .get(urlFor('notifications'))
      .map(response => console.log(response.json()));
  }
}
