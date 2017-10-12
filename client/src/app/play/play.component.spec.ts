import {ComponentFixture, TestBed, async} from "@angular/core/testing";
import {playComponent} from "./play.component"
import {playService} from "./play.service";
import {Play} from "./play";
import {By} from "@angular/platform-browser";
import {DebugElement} from "@angular/core";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";
import {MdSnackBar} from "@angular/material";
import {Observable} from "rxjs/Observable";


describe("Sage play component", () => {

    let component: playComponent;
    let fixture: ComponentFixture<playComponent>;

    let playServiceStub: {
        getPlay: () => Observable<Play[]>
    };

    beforeEach(() => {

        playServiceStub = {
            getPlay: () => Observable.of([
                {
                    _id: "card1",
                    word: "Aesthetic reading",
                    synonym: "artistic",
                    antonym: "Efferant Reading",
                    gensense: "a term to describe reading for pleasure",
                    example: "A readers response that is driven by personal feelings from the transaction between the reader with text Louise Rosenblatt 1978 term"
                }
            ])
        };

        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [playComponent],
            providers: [{provide: playService, useValue: playServiceStub},
                MdSnackBar,
                {provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        });

            fixture = TestBed.createComponent(playComponent);
            component = fixture.componentInstance;

        fixture.detectChanges();

    });

    it("should start at 0 points", () => {
        let points: HTMLElement = fixture.debugElement.query(By.css('mat-chip')).nativeElement;
        expect(points.textContent).toContain("Total Points: 0");
    });

    it('should have a button called `Hint`',() => {
        let button: HTMLElement = fixture.debugElement.query(By.css('mat-raised-button')).nativeElement;
        expect(button.textContent).toContain("Hint");
    });

    it('should have a button called `Next Card`',() => {
        let button: HTMLElement = fixture.debugElement.query(By.css('mat-raised-button')).nativeElement;
        expect(button.textContent).toContain("Next Card");
    });

    it('should have a button called `Do not Know`',() => {
        let button: HTMLElement = fixture.debugElement.query(By.css('mat-raised-button')).nativeElement;
        expect(button.textContent).toContain("Do not Know");
    });

    it('should have a button called `Reset`',() => {
        let button: HTMLElement = fixture.debugElement.query(By.css('mat-raised-button')).nativeElement;
        expect(button.textContent).toContain("Reset");
    });

    it('should have a word',() => {
        let word: HTMLElement = fixture.debugElement.query(By.css('mat-card-title')).nativeElement;
        expect(word.textContent).toContain(component.sageWord);
    });

    it('should have a descriptor called `Synonym`',() => {
        let description: HTMLElement = fixture.debugElement.query(By.css('mat-list-item')).nativeElement;
        expect(description.textContent).toContain(component.sageSynonym);
    });

    it('should have a descriptor called `Antonym`',() => {
        let description: HTMLElement = fixture.debugElement.query(By.css('mat-list-item')).nativeElement;
        expect(description.textContent).toContain(component.sageAntonym);
    });

    it('should have a descriptor called `General Sense`',() => {
        let description: HTMLElement = fixture.debugElement.query(By.css('mat-list-item')).nativeElement;
        expect(description.textContent).toContain(component.sageGensense);
    });

    it('should have a descriptor called `Example`',() => {
        let description: HTMLElement = fixture.debugElement.query(By.css('mat-list-item')).nativeElement;
        expect(description.textContent).toContain(component.sageExample);
    });

});
