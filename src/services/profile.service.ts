
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
import { IProfile } from '../pages/profile/profileInterface';

@Injectable() // optional if no dependency injection
export class ProfileService {

/* define a property for holding the data received via HTTP get */
private _profileUrl = 'https://jsonplaceholder.typicode.com/posts/1'
    
/* add a constructor to inject the dependency for HTTP */
constructor( private _http: Http) {}

/* methods for Profile Service */
    getProfile(): Observable<IProfile[]> {
      return this._http
                    .get(this._profileUrl)
                    .map((response: Response) => <IProfile[]>response.json())
                    .do(data => console.log('All' + JSON.stringify(data)))
                    .do(data => console.log('server data:', data))
                    .catch(this.handleError);
    }

    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
          error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console 
      return Observable.throw(errMsg);
    }
  } 