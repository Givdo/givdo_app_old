import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { State } from '../../store/reducer';

@Injectable()
export class TokenService {

  private _token = undefined;

  constructor(private store: Store<State>) {
    this.store
      // .select(getAuthToken)
      // .subscribe(token => {
      //   this._token = token
      // });
  }

  get() {
    return this._token;
  }
}
