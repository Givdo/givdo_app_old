import { Config } from 'config';

import { Store } from '@ngrx/store';
import { Injectable } from '@angular/core';

import { InitParams } from 'ngx-facebook';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

import { State } from '../app.reducer';

import {
  FacebookAuthorizedAction,
  FacebookNotAuthorizedAction,
  FacebookAuthorizationStartedAction,
} from '../../app/auth/actions';

@Injectable()
export class FacebookService {

  constructor(
    private fb: Facebook,
    private store: Store<State>,
  ) {
    if ('init' in this.fb) {
      this.browserInit();
    }
  }

  checkLogin() {
    this.fb
      .getLoginStatus()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  login() {
    this.store.dispatch(new FacebookAuthorizationStartedAction());

    this.fb
      .login(Config.facebook.scopes)
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  private browserInit() : void {
    console.info('Initializing Facebook browser SDK...');

    const params: InitParams = {
      version: 'v2.8',
      appId: Config.facebook.appId,
    };

    (this.fb as any).init(params);
  }

  private handleSuccess = (response: FacebookLoginResponse) => {
    switch (response.status) {
      case 'connected':
        this.store.dispatch(new FacebookAuthorizedAction(response));
        break;
      case 'not_authorized':
        return this.store.dispatch(new FacebookNotAuthorizedAction(response.status));
      case 'unknown':
        return;
    }
  }

  private handleError = (error) => {
    console.error(`[FacebookService] ${error}`);

    this.store.dispatch(new FacebookNotAuthorizedAction({
      code: 'facebook_not_authorized',
      error: 'You must authorize Givdo to login.',
    }));
  }
}
