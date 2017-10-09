import {Injectable} from '@angular/core';
import {Http, RequestOptions} from '@angular/http';

import {Observable} from "rxjs";
import "rxjs/add/operator/map";

import {Sage} from './sage';
import {environment} from "../../environments/environment";


@Injectable()
export class createcardsListService {
    private sageUrl: string = environment.API_URL + "sages";

    constructor(private http: Http) {
    }

    addNewSage(word : string, synonym : string, antonym : string, gensense : string, example : string): Observable<Boolean> {
        const body = {word:word, synonym:synonym, antonym:antonym, gensense:gensense, example:example};
        console.log(body);

        //Send post request to add a new user with the user data as the body with specified headers.
        return this.http.post(this.sageUrl + "/new", body).map(res => res.json());
    }
}
