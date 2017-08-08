import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

import { State, getUiError } from '../store/reducer';


@Injectable()
export class ErrorService {

  error$: Observable<any>;

  constructor(
    private store: Store<State>,
    public toast: ToastController
  ) {}

  public show(error) {
    if (error === undefined) return;

    let toast = this.toast.create({
      message: error,
      duration: 3000,
      position: 'bottom'
    });

    toast.present();
  }
}
