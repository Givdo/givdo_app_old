import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  quiz = true;
  buttons = false;
  next_question = false;
  sponsored = false;
  winner = false;
  lost = false;
  questions = [
    {
      title: "On average, how many bags does ONE supermarket go through in one year",
      options: [
        { title: '60,500,000' },
        { title: '5,000,000,000' },
        { title: '15,000,000' }
      ],
      answer: 0
    }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad QuizPage');

    let $self = this;

    setTimeout(function() {
      $self.buttons = true;
      $self.next_question = true;
    }, 12000);
  }

  startSingleplay(){
    this.quiz = true;
  }

  startMultiplayer(){
    this.quiz = true;
  }

  buttonQuestion(){
    this.buttons = true;
  }

  quizConfirm(){
    this.next_question = true;
  }

  quizNext(){
    this.sponsored = true;
    this.quiz = false;
  }
}
