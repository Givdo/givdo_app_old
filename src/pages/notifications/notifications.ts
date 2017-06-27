import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notifications',
  templateUrl: 'notifications.html',
})
export class NotificationsPage {
  notifications = [
    { id: 1, name: 'Hudson Marinho',   sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 2, name: 'Diego Toral',      sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/602488_477489475607742_1408376692_n.jpg?oh=9bb5866243c4ac33eee8cd65592eb238&oe=59E44309',              category: "Other" },
    { id: 3, name: 'Érica Santos',     sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/12347631_987859657938232_2582073700173906987_n.jpg?oh=58f7b357107fd78e438d5868e3dc93af&oe=59E0D5CA', category: "Other" },
    { id: 4, name: 'Lydia Montagnese', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-1/12509698_10205801074281193_4044016314830940422_n.jpg?oh=81b149f971c0cb7c72ad05a6f668b724&oe=59DF3C19', category: "Other" },
    { id: 5, name: 'Hudson Marinho',   sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 6, name: 'Diego Toral',      sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/602488_477489475607742_1408376692_n.jpg?oh=9bb5866243c4ac33eee8cd65592eb238&oe=59E44309',              category: "Other" },
    { id: 7, name: 'Érica Santos',     sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/12347631_987859657938232_2582073700173906987_n.jpg?oh=58f7b357107fd78e438d5868e3dc93af&oe=59E0D5CA', category: "Other" },
    { id: 8, name: 'Lydia Montagnese', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-1/12509698_10205801074281193_4044016314830940422_n.jpg?oh=81b149f971c0cb7c72ad05a6f668b724&oe=59DF3C19', category: "Other" },
    { id: 9, name: 'Hudson Marinho',   sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8', category: "Other" },
    { id: 10, name: 'Diego Toral',      sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/602488_477489475607742_1408376692_n.jpg?oh=9bb5866243c4ac33eee8cd65592eb238&oe=59E44309',              category: "Other" },
    { id: 11, name: 'Érica Santos',     sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/12347631_987859657938232_2582073700173906987_n.jpg?oh=58f7b357107fd78e438d5868e3dc93af&oe=59E0D5CA', category: "Other" },
    { id: 12, name: 'Lydia Montagnese', sender_image: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-1/12509698_10205801074281193_4044016314830940422_n.jpg?oh=81b149f971c0cb7c72ad05a6f668b724&oe=59DF3C19', category: "Other" },
  ];

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goback(){
    console.log('back');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Notifications');
  }
}
