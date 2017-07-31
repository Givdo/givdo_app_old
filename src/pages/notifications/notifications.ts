import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { NotificationsService } from '../../app/notifications';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notifications$: Observable<any>;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public notificationsService: NotificationsService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
    // Called only once, just after view has loaded
    this.notifications$ = this.notificationsService.notifications;

    this.notificationsService.load();
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter Notifications');
    // Check for new notifications
    this.notificationsService.check();
  }

  goback(){
    console.log('back');
  }
}
