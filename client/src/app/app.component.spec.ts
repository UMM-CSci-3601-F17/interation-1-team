import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

import {AppModule} from "./app.module";
import {AppComponent} from './app.component';
import {SharedModule} from "./shared.module";
import {MATERIAL_COMPATIBILITY_MODE} from "@angular/material";

describe('AppComponent', () => {
    let appInstance: AppComponent;
    let appFixture: ComponentFixture<AppComponent>;
    let debugElement: DebugElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                SharedModule,
                AppModule
            ],
            providers: [{provide: MATERIAL_COMPATIBILITY_MODE, useValue: true}],
        });

        appFixture = TestBed.createComponent(AppComponent);

        appInstance = appFixture.componentInstance;

        debugElement = appFixture.debugElement;
    });

    it('should create the app', () => {
        expect(appFixture).toBeTruthy();
    });

    it(`should have as title 'app'`, () => {
        expect(appInstance.title).toEqual('I am SAGE');
    });

    it('should render home icon in the navbar', () => {
        appFixture.detectChanges();
        let navbar: HTMLElement = debugElement.query(By.css('td-layout-nav')).nativeElement;
        expect(navbar.textContent).toContain("home");
    });
    
    it('should have sidebar title `I am SAGE`',() => {
        appFixture.detectChanges();
        let sidebar: HTMLElement = debugElement.query(By.css('td-navigation-drawer')).nativeElement;
        expect(sidebar.textContent).toContain("I am SAGE");
    })

    it('should have `Home` in the sidebar',() => {
        appFixture.detectChanges();
        let sidebar: HTMLElement = debugElement.query(By.css('mat-nav-list')).nativeElement;
        expect(sidebar.textContent).toContain("Home");
    })

    it('should have `Play` in the sidebar',() => {
        appFixture.detectChanges();
        let sidebar: HTMLElement = debugElement.query(By.css('mat-nav-list')).nativeElement;
        expect(sidebar.textContent).toContain("Play");
    })

    it('should have `Add a Card` in the sidebar',() => {
        appFixture.detectChanges();
        let sidebar: HTMLElement = debugElement.query(By.css('mat-nav-list')).nativeElement;
        expect(sidebar.textContent).toContain("Add a Card");
    })


});

