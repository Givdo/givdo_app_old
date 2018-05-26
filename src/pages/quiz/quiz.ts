import { Component } from '@angular/core';
import { IonicPage } from 'ionic-angular';

import { Quiz } from "./quiz.model"
import { quizService } from '../../providers/quizService';

@IonicPage()
@Component({
  selector: 'page-quiz',
  templateUrl: 'quiz.html',
})
export class QuizPage {
  
  //Variables to switch views
  showQuiz = false;
  singlePlayerMode: boolean;
  multiPlayerMode: boolean;
  buttons = false;
  next_question = false;
  sponsored = false;
  winner = false;
  lost = false;

  //Variables to control quizzes
  quizzes: Quiz[];
  currentQuiz: Quiz;
  currentQuizId: number;
  errMess: string;

  constructor( private quizService: quizService) {}

  ionViewDidLoad() {

    // Load quizzes
    this.quizService.getQuizzes()
        .subscribe(quizzes => this.quizzes = quizzes["data"],
                  error => this.errMess = error,
                  () => {console.log("done getQuizzes()");
                         this.currentQuiz = this.quizzes.shift();})
    this.buttons = true;
    this.next_question = true;
  }

  //Start quiz on the single player mode 
  startSingleplay(){
    this.showQuiz = true;
    this.singlePlayerMode = true;
  }

  //Start quiz on the multi player mode
  //So far, this function doesn't do anything
  startMultiplayer(){
    this.multiPlayerMode = true;
  }

  buttonQuestion(){
    this.buttons = true;
  }

  quizNext(){
    this.currentQuizId = this.currentQuizId + 1;
    if (this.quizzes.length != 0){
      this.currentQuiz = this.quizzes.shift()
    }else{
      this.showQuiz = false;
      this.sponsored = true;
    }
  }
}
