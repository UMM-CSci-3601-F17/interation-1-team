import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {Sage} from "./sage";
import {createcardListComponent} from "./sage-list.component";
import {createcardsListService} from "./sage-list.service";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";


describe("Sage list", () => {

    let sageList: createcardListComponent;
    let fixture: ComponentFixture<createcardListComponent>;

    let createcardListServiceStub: {
        getSages: () => Observable<Sage[]>
    };

    beforeEach(() => {
        // stub SageService for test purposes
        createcardListServiceStub = {
            getSages: () => Observable.of([
                {
                    _id: "card1",
                    word: "Aesthetic reading",
                    synonym: "artistic",
                    antonym: "Efferant Reading",
                    gensense: "a term to describe reading for pleasure",
                    example: "A readers response that is driven by personal feelings from the transaction between the reader with text Louise Rosenblatt 1978 term"
                },
                {
                    _id: "card2",
                    word: "Alliteration",
                    synonym: "allegory",
                    antonym: "free verse poetry",
                    gensense: "repetition of the initial sound (s) or letters in a group of words.",
                    example: "Often found in prose or poetry: Craig loved his fuzzy furry ferret."
                },
                {
                    _id: "card3",
                    word: "Automaticity",
                    synonym: "Fluency",
                    antonym: "difficult",
                    gensense: "rapid and fluent recognition of words requiring only a minumm of effort and attention",
                    example: "Automatic processing of information from text including comprehension, decoding words and other tasks"
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [createcardListComponent],
            // providers:    [ SageListService ]  // NO! Don't provide the real service!
            // Provide a test-double instead
            providers: [{provide: createcardsListService, useValue: createcardListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(createcardListComponent);
            sageList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("contains all the cards", () => {
        expect(sageList.sages.length).toBe(3);
    });

    it("contains a card with the word 'Aesthetic reading'", () => {
        expect(sageList.sages.some((sage: Sage) => sage.word === "Aesthetic reading")).toBe(true);
    });

    it("contain a sage with the word 'Alliteration'", () => {
        expect(sageList.sages.some((sage: Sage) => sage.word === "Alliteration")).toBe(true);
    });

    it("doesn't contain a sage with the word 'Obstinate'", () => {
        expect(sageList.sages.some((sage: Sage) => sage.word === "Obstinate")).toBe(false);
    });

    it("has one sages that has 'allegory' as a synonym", () => {
        expect(sageList.sages.filter((sage: Sage) => sage.synonym === "allegory").length).toBe(1);
    });

});

describe("Misbehaving Sage List", () => {
    let sageList: createcardListComponent;
    let fixture: ComponentFixture<createcardListComponent>;

    let sageListServiceStub: {
        getSages: () => Observable<Sage[]>
    };

    beforeEach(() => {
        // stub SageService for test purposes
        sageListServiceStub = {
            getSages: () => Observable.create(observer => {
                observer.error("Error-prone observable");
            })
        };

        TestBed.configureTestingModule({
            imports: [FormsModule, SharedModule],
            declarations: [createcardListComponent],
            providers: [{provide: createcardsListService, useValue: sageListServiceStub},
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}]
        })
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(createcardListComponent);
            sageList = fixture.componentInstance;
            fixture.detectChanges();
        });
    }));

    it("generates an error if we don't set up a SageListService", () => {
        // Since the observer throws an error, we don't expect sages to be defined.
        expect(sageList.sages).toBeUndefined();
    });
});
