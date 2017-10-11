import {Component, OnInit} from '@angular/core';
import {playService} from "./play.service";
import {Play} from "./play";
import {Observable} from "rxjs";
import {MdSnackBar} from "@angular/material";
import {MatChipsModule} from '@angular/material';

@Component({
    selector: 'play-component',
    templateUrl: 'play.component.html',
    styleUrls: ['./play.component.css'],
    providers: []
})

export class playComponent implements OnInit {
    //These are public so that tests can reference them (.spec.ts)

    public sage: Play;

    public totalpoints: number = 0;
    public notselected: number[] = [1,2,3,4];
    public selected:number = 0;


    public sageWord : string;
    public sageSynonym : string;
    public sageAntonym : string;
    public sageGensense : string;
    public sageExample : string;


    //Inject the SageListService into this    MatChipList component.
    //That's what happens in the following constructor.
    //
    //We can call upon the service for interacting
    //with the server.
    constructor(public sageListService: playService, public snackBar: MdSnackBar) {

    }

    randomizeSages() {
        if(this.notselected.length > 0) {
            let randnum = Math.floor(Math.random() * this.notselected.length);
            this.selected = this.notselected[randnum];
            this.notselected.splice(randnum, 1);
        } else {
            this.snackBar.open("All hints used", null ,{duration: 3000});
        }
    }

    nextSage() {
        this.totalpoints = this.notselected.length + 1 + this.totalpoints;
        this.selected = 0;
        this.notselected = [1,2,3,4];
    }

    resetSage() {
        this.totalpoints = 0;
        this.selected = 0;
        this.notselected = [1,2,3,4];
    }

    didntgetSage() {
        this.notselected = [1,2,3,4];
        this.selected = 0
    }

    refreshSages(): Observable<Play[]> {
        //Get Users returns an Observable, basically a "promise" that
        //we will get the data from the server.
        //
        //Subscribe waits until the data is fully downloaded, then
        //performs an action on it (the first lambda)

        let plays : Observable<Play[]> = this.sageListService.getSages();
        plays.subscribe(
            sages => {
                this.sage = sages[0];
            },
            err => {
                console.log(err);
            });
        return plays;
    }

    ngOnInit(): void {
        this.refreshSages();
    }

}
