import { Config } from 'config';

import { Store } from '@ngrx/store';
import { Platform } from 'ionic-angular';
import { Injectable } from '@angular/core';

import { FacebookLoginResponse } from '@ionic-native/facebook';
import { Facebook as NativeFacebook } from '@ionic-native/facebook';

import { InitParams } from 'ngx-facebook';
import { FacebookService as BrowserFacebook } from 'ngx-facebook';

import { State } from '../app.reducer';

import {
  LoginInProcessAction,
  FacebookAuthorizedAction,
  FacebookNotAuthorizedAction,
} from '../../app/auth/actions';

@Injectable()
export class FacebookService {

  private fb: any;

  constructor(
    private platform: Platform,
    private store: Store<State>,
    private nativeFb: NativeFacebook,
    private browserFb: BrowserFacebook,
  ) {
    if (this.platform.is('ios')) {
      this.fb = nativeFb;
    } else {
      this.fb = browserFb;
      this.browserInit();
    }
  }

  checkLogin() {
    this.store.dispatch(new LoginInProcessAction(true));

    this.fb
      .getLoginStatus()
      .then(this.handleSuccess)
      .catch(this.handleError);
  }

  login() {
    this.store.dispatch(new LoginInProcessAction(true));

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

    this.fb.init(params);
  }

  private handleSuccess = (response: FacebookLoginResponse) => {
    switch (response.status) {
      case 'connected':
        return this.store.dispatch(new FacebookAuthorizedAction(response));
      case 'unknown':
        return this.store.dispatch(new LoginInProcessAction(false));
      case 'not_authorized':
        return this.store.dispatch(new FacebookNotAuthorizedAction(response.status));
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
