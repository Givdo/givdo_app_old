import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Quiz } from "./quiz.model"
import { quizService } from '../../providers/quizService';

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
  
  quizzes: Quiz[];
  errMess: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private quizService: quizService) {
  }

  ionViewDidLoad() {
    let $self = this;

    setTimeout(function() {
      $self.buttons = true;
      $self.next_question = true;
    }, 12000);

    this.quizService.getQuizzes()
      .subscribe(quizzes => this.quizzes = quizzes["data"],
                  error => this.errMess = error,
                  () => console.log("done getQuizzes()"))
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
