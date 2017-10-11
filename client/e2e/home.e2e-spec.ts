import {HomePage} from './home.po';
import {browser, protractor} from 'protractor';
import {before} from "selenium-webdriver/testing";

/*This test needs sage-list e2e testing to go first to run correctly*/
describe('iteration 1', () => {
    let page: HomePage;


    beforeEach(() => {
        page = new HomePage();
        page.navigateTo();
    });

    it('should get and highlight the logo/title', () => {
        expect(page.getLogo()).toEqual('I am SAGE');
    });
    it('should get and highlight the summary', () => {
        expect(page.getExplaination()).toEqual('Welcome to I am SAGE, an educational vocabulary learning tool!');
    });
    it('should get and highlight the play button', () => {
        expect(page.getPlayButton()).toEqual('PLAY');
    });
    it('should get and highlight the add a card button', () => {
        expect(page.getAddACardButton()).toEqual('ADD A CARD');
    });
});
