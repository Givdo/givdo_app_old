
import { Injectable } from '@angular/core';
//import { HttpClient } from '@angular/common/http';
import { Http, Response, Headers} from '@angular/http';
import { HttpModule, JsonpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Location } from '@angular/common';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable() 
export class OrganizationService {

private _organizationsUrl = 'orgData.json';

    constructor( private _http: Http) {}

    /* get Organization data */
    getOrganizations(): Observable<[{}]> {
      return this._http
                    .get(this._organizationsUrl)
                    .map((response: Response) => <[{}]>response.json())
                    .catch(this.handleError);
    }

    private handleError (error: any) {
          let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console
      return Observable.throw(errMsg);
    }
 } // Service ends

 