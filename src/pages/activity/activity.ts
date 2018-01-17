import { Component } from '@angular/core';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {
  score: number = 0;
  notifications = [
    { id: 1, name: 'Breast Cancer Emergency Found(BCEF)',    sender_image: 'http://placehold.it/50x50', score: 10 },
    { id: 2, name: 'Marine Conservation Science Institute',  sender_image: 'http://placehold.it/50x50', score: 1 },
    { id: 3, name: 'Equality California',                    sender_image: 'http://placehold.it/50x50', score: 18 },
    { id: 3, name: 'Equality California',                    sender_image: 'http://placehold.it/50x50', score: 2 },
    { id: 4, name: 'Sierra Club',                            sender_image: 'http://placehold.it/50x50', score: 12 },
    { id: 5, name: 'Breast Cancer Emergency Found(BCEF)',    sender_image: 'http://placehold.it/50x50', score: 7 },
    { id: 6, name: 'Marine Conservation Science Institute',  sender_image: 'http://placehold.it/50x50', score: 7 },
    { id: 7, name: 'Equality California',                    sender_image: 'http://placehold.it/50x50', score: 5 },
    { id: 8, name: 'Equality California',                    sender_image: 'http://placehold.it/50x50', score: 10 },
    { id: 9, name: 'Sierra Club',                            sender_image: 'http://placehold.it/50x50', score: 11 },
  ];

  constructor() {
  }

  ionViewDidLoad() {
    let score: number = this.score;

    this.notifications.forEach(function(e){
      score += e.score
    });

    this.score = (score / 100)
  }

}
