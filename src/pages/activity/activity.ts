import { Component } from '@angular/core';
import { Activity } from './activityModel'
import { activityService } from './activity.sevice';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  private activities: any[];
  private totalDonation : number;

  constructor(private activityService: activityService) {}

  ionViewDidLoad() {
    this.activities = this.activityService.getActivities();
    this.totalDonation = this.activityService.getTotalScore() / 100;

  }

}
