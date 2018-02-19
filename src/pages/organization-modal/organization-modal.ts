import { Component } from '@angular/core';
import { IonicPage, ViewController, NavController, NavParams } from 'ionic-angular';
import { OrganizationService } from '../../services/organization.service';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';

@IonicPage()
@Component({
  selector: 'page-organization-modal',
  templateUrl: 'organization-modal.html',
})
export class OrganizationModalPage {
//profileName : any;
organization : any;
searchQuery: string = '';
errorMessage: string;
private organizations : any [] =[];
private items : any;
haveData: boolean = false;
  
@ViewChild(Slides) slides: Slides;
  constructor( public viewCtrl: ViewController,
               public navCtrl: NavController, 
               public navParams: NavParams, 
               public _organizationService: OrganizationService) 
               {}


  ionViewDidLoad() {
   this._organizationService.getOrganizations()
                  .subscribe( organizations => {
                  this.organizations = organizations['data'],
                  error => this.errorMessage = <any>error,
                  () => console.log('done')
                });
  }

  closeModal() {
      this.viewCtrl.dismiss(this.organization);
  }

  onOrganizationSelected($event, organizationSelected) {
      this.organization = organizationSelected;
  }

  initializeItems() {
     this.items = this.organizations;
  }

  getItems(event: any) {
      // Reset items back to all of the items
      this.initializeItems();
      // set val to the value of the searchbar
       let val = event.target.value;
      // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {
          this.haveData = true;
          this.items = this.items.filter((orgList) => {
          return (orgList.attributes.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
          })
        } else {
          console.log('Nothing to list');
          this.haveData = false;
        }
  }
    
  slideChanged() {
    if (this.slides.isEnd()) {
        this.slideToFirst();
    }
    if(this.slides.isBeginning()) {
       this.slideNext();
    }
  }
  
  getNext() {
    this.slides.slideNext(500, true);
  }

  getPrev() {
    this.slides.slidePrev(500, true);
  }

  slideNext() {
    this.getNext();
  }

  slideToFirst() {
    this.slides.slideTo(0, 100);
  }
}
