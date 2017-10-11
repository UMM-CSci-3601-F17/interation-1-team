import {SagePage} from './sage-list.po';
import {browser, protractor} from 'protractor';
import {before} from "selenium-webdriver/testing";

//let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
//browser.driver.controlFlow().execute = function () {
//let args = arguments;

//queue 100ms wait between test
//This delay is only put here so that you can watch the browser do its' thing.
//If you're tired of it taking long you can remove this call
//origFn.call(browser.driver.controlFlow(), function () {
//return protractor.promise.delayed(100);
//});

//return origFn.apply(browser.driver.controlFlow(), args);
//};

describe('iteration 1', () => {
    let page: SagePage;


    beforeEach(() => {
        page = new SagePage();
        page.navigateTo();
    });

    it('should get and highlight New Card attribute ', () => {
        expect(page.getAddCardTitle()).toEqual('New Card');
    });

    it('should get and highlight Cards attribute ', () => {
        expect(page.getAddCardsTitle()).toEqual('Cards');
    });

    it ('creates a card and checks if it created it', () => {
        page.addAWord("stuff");
        page.addASynonym("more stuff");
        page.addAAntonym("some more stuff");
        page.addAGenSense("even more stuff");
        page.addAExample("endless stuff");
        page.addCardButton();
        page.addAWord("a");
        page.addASynonym("b");
        page.addAAntonym("c");
        page.addAGenSense("d");
        page.addAExample("e");
        page.addCardButton();
        page.addAWord("stuff");
        page.addASynonym("more stuff");
        page.addAAntonym("some more stuff");
        page.addAGenSense("even more stuff");
        page.addAExample("endless stuff");
        page.addCardButton();
        expect(page.getFirstCard()).toEqual("Word: stuff || Synonym: more stuff || Antonym: some more stuff || General Sense: even more stuff || Example: endless stuff");
    });
});
