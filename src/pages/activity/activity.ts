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
  errorMessage: string;

  constructor(private activityService: activityService) {}

  ionViewDidLoad() {
    var totalScore : number = 0;
    this.activityService.getActivities()
                        .subscribe( (activities) => {this.activities = activities["data"],
                                          this.activities.map(activity => totalScore = totalScore + activity.score);
                                          this.totalDonation = totalScore / 100 },
                                    (error) => this.errorMessage = error,
                                    () => console.log('done getActivities()'))
  }
}
