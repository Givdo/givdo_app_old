import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TranslateService } from '@ngx-translate/core';

import { WelcomePage } from '../pages/welcome/welcome';
import { FacebookService } from './auth/facebook.service';

@Component({
  templateUrl: 'app.html'
})
export class GivdoApp {
  rootPage:any = WelcomePage;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public facebook: FacebookService,
    public splashScreen: SplashScreen,
    public translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    this.initializePlatform();
  }

  initializePlatform() {
    this.platform.ready().then(() => {
      this.facebook.checkLogin();
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
