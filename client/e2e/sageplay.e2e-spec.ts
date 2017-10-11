import {PlayPage} from './sageplay.po';
import {browser, protractor} from 'protractor';
import {before} from "selenium-webdriver/testing";

/*This test needs sage-list e2e testing to go first to run correctly*/
describe('iteration 1', () => {
    let page: PlayPage;


    beforeEach(() => {
        page = new PlayPage();
        page.navigateTo();
    });

    it('should get and highlight the word', () => {
        expect(page.getCardWord()).toEqual('stuff');
    });
    it('should get and highlight the synonym ', () => {
        expect(page.getCardSynonym()).toEqual('Synonym: more stuff');
    });
    it('should get and highlight the antonym ', () => {
        expect(page.getCardAntonym()).toEqual('Antonym: some more stuff');
    });
    it('should get and highlight the general sense', () => {
        expect(page.getCardGensense()).toEqual('General Sense: even more stuff');
    });
    it('should get and highlight the example ', () => {
        expect(page.getCardExample()).toEqual('Example: endless stuff');
    });
    it('should get and highlight the point total', () => {
        expect(page.getPointTotal()).toEqual('Total Points: 0');
    });
    it('should press next and then reset and highlight the point total', () => {
        page.nextCardButton();
        page.resetButton();
        expect(page.getPointTotal()).toEqual('Total Points: 0');
    });
    it('should press hint, then next button and highlight the point total', () => {
        page.hintButton();
        page.nextCardButton();
        expect(page.getPointTotal()).toEqual('Total Points: 4');
    });
    it('should press hint, then dont know button and highlight the point total', () => {
        page.hintButton();
        page.dontKnowButton();
        expect(page.getPointTotal()).toEqual('Total Points: 0');
    });

});
