import { OnInit, Injectable } from '@angular/core';
import { Activity } from './activityModel';
import activities from './activity.data';

@Injectable()
export class activityService implements OnInit {
    private activities : any[] = [];

    // Question: Do I readlly need this function?
    // data is loaded when 'getActivities' function is fired.
    ngOnInit(){
        this.load()
        console.log("call ngOnInit()")
    }

    // Function to load data from server (so far from data mock)
    load(){    
        console.log("call load()")
        //TODO:HTTP request to load data
        this.activities = activities;
    }
    
    // Function to send data to server
    save(){
        //TODO: HTTP request to save data
    }

    // Function to get data from this Service
    getActivities(){
        console.log("call getActivities")
        this.load()
        return this.activities.slice();
    }
    
    // Function to add data to this Service 
    addItem(orgName: string){
        const id = this.activities.length;
        //TODO: Import the organization image from organization Service, which may not be created so far.
        const sender_image = 'http://placehold.it/50x50';
        //TODO: Get scrore from the result of game
        const score = 2

        this.activities.push(new Activity(id,orgName,sender_image,score));
    }

    // Function to calculate and get the total score 
    getTotalScore(){
        let totalScore: number = 0;
        this.activities.forEach( (activity) => {
            totalScore += activity.score 
        })
        return totalScore;
    }


}