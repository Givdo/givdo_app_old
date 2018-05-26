import { OnInit, Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';

import { Quiz } from '../pages/quiz/quiz.model';

@Injectable()
export class quizService implements OnInit {

    private _quizzesURL = 'quizzes.json'

    constructor(public _http: Http){ }

    ngOnInit(){ }
    
    // Function to do HTTP request to server. 
    getQuizzes(): Observable<Quiz[]> {
       return this._http
                    .get(this._quizzesURL)
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