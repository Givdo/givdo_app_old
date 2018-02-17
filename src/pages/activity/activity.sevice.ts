import { OnInit, Injectable } from '@angular/core';
import { Activity } from './activityModel';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class activityService implements OnInit {
    private activities : any[];

    constructor(public http:Http){
        console.log("activityService is constructed")
    }

    // Question: Do I readlly need this function?
    // data is loaded when 'getActivities' function is fired.
    ngOnInit(){
        // this.load()
        console.log("call ngOnInit()")
    }

    // Function to load data from server (so far from data mock)
    // load(){    
    //     //TODO:HTTP request to load data
    //     this.http.get('./activity.data.ts')
    //         .map(res => res.json())
    //         .subscribe(
    //             data => console.log(data)        
    //         );
    // }
    
    // Function to send data to server
    save(){
        //TODO: HTTP request to save data
    }

    // Function to get data from this Service
    getActivities() : Observable<Activity[]>{
        console.log("call getActivities")
        return this.http.get("http://localhost:8100/assets/activity.data.json")
                        .map(res => {
                            console.log(res)
                            console.log(res.json())
                            return res.json().map(item => {
                                console.log(item)
                                return new Activity(
                                    item.id, item.orgName,item.sender_image,item.score,item.gameResult
                                );
                            });
                        });
    }
    
    // Function to add data to this Service 
    addItem(orgName: string){
        const id = this.activities.length;
        //TODO: Import the organization image from organization Service, which may not be created so far.
        const sender_image = 'http://placehold.it/50x50';
        //TODO: Get scrore from the result of game
        const score = 2
        //TODO: Get the game result
        const gameResult = "lost"

        this.activities.push(new Activity(id,orgName,sender_image,score, gameResult));
    }
    // // Function to calculate and get the total score 
    // getTotalScore(){
    //     let totalScore: number = 0;
    //     this.activities.forEach( (activity) => {
    //         totalScore += activity.score 
    //     })
    //     return totalScore;
    // }
}