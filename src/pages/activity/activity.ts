import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the Activity page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  notifications = [
    { id: 1, name: 'Breast Cancer Emergency Found(BCEF)',    sender_image: 'http://placehold.it/50x50', category: "Other" },
    { id: 2, name: 'Marine Conservation Science Institute',  sender_image: 'http://placehold.it/50x50', category: "Other" },
    { id: 3, name: 'Equality California',                    sender_image: 'http://placehold.it/50x50', category: "Other" },
    { id: 3, name: 'Equality California',                    sender_image: 'http://placehold.it/50x50', category: "Other" },
    { id: 4, name: 'Sierra Club',                            sender_image: 'http://placehold.it/50x50', category: "Other" },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  goback(){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Activity');
  }

}
