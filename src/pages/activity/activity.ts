import { Component } from '@angular/core';
import { Activity } from './activityModel'
import { activityService } from '../../providers/activity.service';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})

export class ActivityPage {
  private activities: Activity[];
  private totalDonation: number;

  constructor(private activityService: activityService) {}

  ionViewDidLoad() {
    var totalScore : number = 0;
    this.activityService.getActivities()
                        .subscribe(
                          (data)  => {this.activities = data;
                                      data.map(item => totalScore = totalScore + item.score);
                                      this.totalDonation = totalScore / 100 ;
                                      console.log("Observable streaming is completed")
                                      },
                          (error) => {console.log(error)});
  }
}
