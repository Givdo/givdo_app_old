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

  // notifications = [
  //   { id: 1, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
  // ];

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

}
