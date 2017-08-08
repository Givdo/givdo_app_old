import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { State, getAuthState } from '../../store/reducer';

@Injectable()
export class TokenService {

  private _token = undefined;

  constructor(private store: Store<State>) {
    this.store
      .select(getAuthState)
      .subscribe(state => this._token = state.token);
  }

  get() {
    return this._token;
  }
}
