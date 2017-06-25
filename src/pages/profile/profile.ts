import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Location } from '@angular/common';

/**
 * Generated class for the Profile page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  constructor(private _location: Location, public navCtrl: NavController, public navParams: NavParams) {
  }

  goback(){
    console.log('back');
    this._location.back();
    console.log('back');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Profile');
  }

  profile = {
    name: 'Hudson Marinho',
    organization: 'Equality California',
    cover: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/18425242_10213185949745627_4241011864242994274_n.jpg?oh=c96b00a645b535b334bbdcd8d2ad51ab&oe=59BDFFA9',
    photo: 'https://scontent.fnat1-1.fna.fbcdn.net/v/t1.0-9/15135885_10211374182932589_8708865600205752698_n.jpg?oh=de2eb36822682431284320c218e2b7e8&oe=59B7F8B8',
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
  }
}
