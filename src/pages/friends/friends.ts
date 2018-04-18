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

  constructor(public friendsService: friendsService) { }

  ionViewDidLoad() {
    this.friendsService.getFriends()
                        .subscribe(
                          (data)  => {this.friends = data;
                                      console.log("Observable streaming is completed")
                                      },
                          (error) => {console.log(error)});
  }
}
