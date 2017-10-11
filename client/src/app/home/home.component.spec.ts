import {TestBed, ComponentFixture} from "@angular/core/testing";
import {HomeComponent} from "./home.component";
import {DebugElement} from "@angular/core";
import {By} from "@angular/platform-browser";
import {SharedModule} from "../shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";

describe('Home', () => {

    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;
    let de: DebugElement;
    let el: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [SharedModule],
            declarations: [HomeComponent], // declare the test component
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        });

        fixture = TestBed.createComponent(HomeComponent);

        component = fixture.componentInstance; // BannerComponent test instance

        // query for the title <h1> by CSS element selector
        de = fixture.debugElement.query(By.css('#i-am-sage'));
        el = de.nativeElement;
    });

    it("displays a greeting", () => {
        fixture.detectChanges();
        expect(el.textContent).toContain(component.text);
    });

    it('should have a button called `Play`',() => {
        fixture.detectChanges();
        let playButton: HTMLElement = fixture.debugElement.query(By.css('mat-card-actions')).nativeElement;
        expect(playButton.textContent).toContain("Play");
    });

    it('should have a button called `Add a Card`',() => {
        fixture.detectChanges();
        let playButton: HTMLElement = fixture.debugElement.query(By.css('mat-card-actions')).nativeElement;
        expect(playButton.textContent).toContain("Add a Card");
    });

});
