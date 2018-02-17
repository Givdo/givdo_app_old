import { Component } from '@angular/core';
import { Activity } from './activityModel'
import { activityService } from './activity.sevice';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})

export class ActivityPage {
  private activities$: Observable<Activity[]>;
  private totalDonation : number;

  constructor(private activityService: activityService) {}

  ionViewDidLoad() {
    this.activities$ = this.activityService.getActivities()
                            // (data) => { this.activities.push(data); },
                            // (err)  => { console.log(err); },
                            // () => { this.getTotalDonation()} 
  }

  // Function to calculate and get the total score 
//   getTotalDonation(){
//     let totalScore: number = 0;
//     this.activities.forEach( (activity) => {
//         totalScore += activity.score 
//     })
//     this.totalDonation = totalScore / 100;
// }
}
