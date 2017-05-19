import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Notifications page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {

  notifications = [
    { id: 1, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 2, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 3, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 4, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 5, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 6, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 7, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 8, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 9, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 10, name: 'Hudson Marinho', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
  ];

  accept(item: string) {
    console.log('Accept', item);
  }

  reject(item: string) {
    console.log('Reject', item);
  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
  }

}
