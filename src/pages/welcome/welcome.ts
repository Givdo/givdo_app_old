import {
  IonicPage,
  NavController,
  ToastController,
} from 'ionic-angular';
import { Store } from '@ngrx/store';
import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { TabsPage } from '../tabs/tabs';

import {
  State,
  getUiError,
  getUiLoading,
  getCurrentUserId,
} from '../../app/store/reducer';
import { FacebookService } from '../../app/auth';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  currentUserId$: Observable<any>;
  loginInProcess$: Observable<boolean>;

  constructor(
    private store: Store<State>,
    public navCtrl: NavController,
    public facebook: FacebookService,
    public toast: ToastController,
  ) {}

  ionViewDidLoad() {
    this.currentUserId$ = this.store.select(getCurrentUserId);
    this.loginInProcess$ = this.store.select(getUiLoading);

    this.currentUserId$.subscribe((id) => {
      if (id)
        this.navCtrl.push(TabsPage);
    });
  }

  login() {
    this.facebook.login();
  }

}
