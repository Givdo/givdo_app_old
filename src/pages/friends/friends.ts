import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { friendsService } from '../../providers/friends.service';

@IonicPage()
@Component({
  selector: 'page-friends',
  templateUrl: 'friends.html',
})
export class FriendsPage {

  private friends: any[];
  errorMessage: string;

  constructor(public friendsService: friendsService) { }

  ionViewDidLoad() {
    this.friendsService.getFriends()
                        .subscribe( friends => this.friends = friends["data"],
                          error => this.errorMessage = <any>error,
                          () => console.log('done getFriends()'));
  }
}
