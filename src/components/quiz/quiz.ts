import { Component } from '@angular/core';

/**
 * Generated class for the QuizComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'quiz',
  templateUrl: 'quiz.html'
})
export class QuizComponent {

  text: string;

  constructor() {
    console.log('Hello QuizComponent Component');
    this.text = 'Hello World';
  }

}
