
import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import { of } from 'rxjs/observable/of';
import { IUser } from '../pages/profile/userInterface';
import { Facebook } from '@ionic-native/facebook';
import { FacebookService } from '../app/auth/services/facebook';

@Injectable()
export class UserService {
   userData: IUser[] = [];
  
  constructor(private _http: Http,
              private facebook: Facebook,
              private _facebookService: FacebookService) { }

  getUser(): Observable<IUser[]> {
    this.facebook.api('/me?fields=name,picture,cover', [])
      .then(profile => {
      this.userData['name'] = profile['name'];
      this.userData['picture'] = profile['picture']['data']['url'];
      this.userData['cover'] = profile['cover']['source'];
      console.log(profile)
      })
      .catch(this.handleError);
      console.log(this.userData);
      return of(this.userData);
  }

  /* To be modified */
  loggedIn() {
    this._facebookService.checkLogin()
      .then(response => {
        console.log(response);
        console.log('FB Profile data: ');
      })
      .catch(e => console.log(e));

  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

} // Service ends

















   /* private handleError(err: HttpErrorResponse) {
      console.log(err.message);
      return Observable.throw(err.message);
    }*
    


  


      /* return  [{
      name: 'Hudson Marinho',
      organization: 'Equality California',
      photo: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-1/12509698_10205801074281193_4044016314830940422_n.jpg?oh=81b149f971c0cb7c72ad05a6f668b724&oe=59DF3C19',
      causes: [
        { name: 'Animal Welfare',          slug: 'animal-welfare'  },
        { name: 'Art Theatre',             slug: 'art-theatre'  },
        { name: 'Community',               slug: 'community'  },
        { name: 'Environment',             slug: 'environment'  },
        { name: 'Family Services',         slug: 'family-services'  },
        { name: 'Health Wellness',         slug: 'health-wellness'  },
        { name: 'Human Rights',            slug: 'human-rights'  },
        { name: 'Hunger',                  slug: 'hunger'  },
        { name: 'International Support',   slug: 'international-support'  },
        { name: 'Mental Health',           slug: 'mental-health'  },
        { name: 'Science Research',        slug: 'science-research'  },
        { name: 'Youth Education',         slug: 'youth-education'  }
      ],
      achievements: [
        { name: 'Giver',           slug: '1-giver' },
        { name: 'Samaritan',       slug: '2-samaritan' },
        { name: 'Altruist',        slug: '3-altruist' },
        { name: 'Benefactor',      slug: '4-benefactor' },
        { name: 'Patron',          slug: '5-patron' },
        { name: 'Grantor',         slug: '6-grantor' },
        { name: 'Philanthropist',  slug: '7-philanthropist' }
      ],
        }]; */
