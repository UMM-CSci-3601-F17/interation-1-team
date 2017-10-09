import {Component, OnInit} from '@angular/core';
import {createcardsListService} from "./sage-list.service";
import {Sage} from "./sage";
import {Observable} from "rxjs";

@Component({
    selector: 'sage-list-component',
    templateUrl: 'sage-list.component.html',
    styleUrls: ['./sage-list.component.css'],
    providers: []
})

export class createcardListComponent implements OnInit {
    //These are public so that tests can reference them (.spec.ts)
    public sages: Sage[];
    private sageAddSuccess : Boolean = false;

    public newSageWord:string;
    public newSageSynonym: string;
    public newSageAntonym: string;
    public newSageGensense: string;
    public newSageExample: string;


    //Inject the SageListService into this component.
    //That's what happens in the following constructor.
    //
    //We can call upon the service for interacting
    //with the server.
    constructor(public sageListService: createcardsListService) {

    }

    addNewSage(word: string, synonym: string, antonym : string, gensense : string, example : string) : void{
        if(word != null && synonym != null && antonym != null && gensense != null && example != null) {
            //Here we clear all the fields, there's probably a better way
            //of doing this could be with forms or something else
            this.newSageWord = null;
            this.newSageSynonym = null;
            this.newSageAntonym = null;
            this.newSageGensense = null;
            this.newSageExample = null;

            this.sageListService.addNewSage(word, synonym, antonym, gensense, example).subscribe(
                succeeded => {
                    this.sageAddSuccess = succeeded;
                });
        } else {
            console.log("Failed to add card, missing params");
        }
    }

    ngOnInit(): void {
    }

}
