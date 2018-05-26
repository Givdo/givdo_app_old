import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Location } from '@angular/common';
import { OrganizationModalPage } from '../organization-modal/organization-modal';
//import { CausesModalPage } from '../causes-modal/causes-modal';
import { UserService } from '../../providers/userService.service';
import { IUser } from './userInterface';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FacebookService } from '../../app/auth/services/facebook';
import { Store } from '@ngrx/store';
import { Config } from '../../config/dev';
import { Observable } from 'rxjs/Observable';
import {
  State,
  getUiError,
  getUiLoading,
  getCurrentUserId,
} from '../../app/store/reducer';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  errorMessage: string;
  profile: IUser[] = [];
  currentUserId$: Observable<any>;
  loginInProcess$: Observable<boolean>;

  causes = [
    { name: 'Animal Welfare', slug: 'animal-welfare' },
    { name: 'Art Theatre', slug: 'art-theatre' },
  ];

  achievements = [
    { name: 'Giver', slug: '1-giver' },
    { name: 'Samaritan', slug: '2-samaritan' },
    { name: 'Altruist', slug: '3-altruist' },
    { name: 'Benefactor', slug: '4-benefactor' },
    { name: 'Patron', slug: '5-patron' },
    { name: 'Grantor', slug: '6-grantor' },
    { name: 'Philanthropist', slug: '7-philanthropist' }
  ];

  constructor(private store: Store<State>,
    private _location: Location,
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public _userService: UserService,
    public _facebookService: FacebookService,
    public facebook: Facebook) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
    this.getProfile();

    this.currentUserId$ = this.store.select(getCurrentUserId);
    this.loginInProcess$ = this.store.select(getUiLoading);

    /* To be modified */
    this.currentUserId$.subscribe((id) => {
      if (id) {
        console.log('Id is ' + id);
      }
    });

    /* To be modified */
    this._facebookService.checkLogin().then(response => {
      console.log(response);
      console.log('FB Profile data: ');
    })
      .catch(e => console.log(e));

  }

  getProfile(): void {
    this._userService.getUser()
      .subscribe(data => this.profile = data);
      console.log(this.profile);
  }

 /*  goback() {
    console.log('back');
  } */

  // Organization modal page
  openModal() {
    let orgModal = this.modalCtrl.create(OrganizationModalPage, this.profile);
    orgModal.present();
    orgModal.onDidDismiss(data => {
      console.log(data);
      this.profile['organization'] = data;
    });
  }


}
