import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ActivityPage } from '../activity/activity';
import { ProfilePage } from '../profile/profile';
import { FriendsPage } from '../friends/friends';
import { NotificationsPage } from '../notifications/notifications';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  friendsTab = FriendsPage;
  profileTab = ProfilePage;
  activityTab = ActivityPage;
  notificationTab = NotificationsPage;

  constructor(private nav: NavController) {
  }
}
