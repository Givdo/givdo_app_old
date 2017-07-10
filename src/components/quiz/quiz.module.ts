import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { QuizComponent } from './quiz';

@NgModule({
  declarations: [
    QuizComponent,
  ],
  imports: [
    IonicPageModule.forChild(QuizComponent),
  ],
  exports: [
    QuizComponent
  ]
})
export class QuizComponentModule {}
