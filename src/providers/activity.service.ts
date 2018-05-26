import { OnInit, Injectable } from '@angular/core';
import { Activity } from '../pages/activity/activityModel';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

@Injectable()
export class activityService implements OnInit {

    private _activitiesURL = 'activity.data.json'

    constructor(public _http: Http){ }

    ngOnInit(){ }
    
    // Function to send data to server
    save(){
        //TODO: HTTP request to save data
    }

    // Function to do HTTP request to server. 
    getActivities(): Observable<Activity[]> {
       return this._http
                    .get(this._activitiesURL)
                    .map( (response: Response) => response.json())
                    .catch(this.handleError)
    }

    private handleError (error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console 
        return Observable.throw(errMsg);
    }

}