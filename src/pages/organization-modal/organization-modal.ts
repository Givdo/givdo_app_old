import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-organization-modal',
  templateUrl: 'organization-modal.html',
})
export class OrganizationModalPage {
  organizations = [
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' },
    { name: "Organization", image: 'http://via.placeholder.com/150x150' }
  ]

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad OrganizationModalPage');
    // this.profile = this.viewCtrl.data;
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  goback() {
    this.closeModal();
  }
}
