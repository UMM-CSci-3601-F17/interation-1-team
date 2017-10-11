import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class PlayPage {
    navigateTo() {
        return browser.get('/play');
    }

    //http://www.assertselenium.com/protractor/highlight-elements-during-your-protractor-test-run/
    highlightElement(byObject) {
        function setStyle(element, style) {
            const previous = element.getAttribute('style');
            element.setAttribute('style', style);
            setTimeout(() => {
                element.setAttribute('style', previous);
            }, 200);
            return "highlighted";
        }

        return browser.executeScript(setStyle, element(byObject).getWebElement(), 'color: red; background-color: yellow;');
    }

    getCardWord() {
        let todo = element(by.id('sagesword')).getText();
        this.highlightElement(by.id('sagesword'));

        return todo;
    }

    getCardSynonym() {
        let todo = element(by.id('sagessyn')).getText();
        this.highlightElement(by.id('sagessyn'));

        return todo;
    }

    getCardAntonym() {
        let todo = element(by.id('sagesant')).getText();
        this.highlightElement(by.id('sagesant'));

        return todo;
    }

    getCardGensense() {
        let todo = element(by.id('sagesgensense')).getText();
        this.highlightElement(by.id('sagesgensense'));

        return todo;
    }

    getCardExample() {
        let todo = element(by.id('sagesexam')).getText();
        this.highlightElement(by.id('sagesexam'));

        return todo;
    }

    getPointTotal() {
        let todo = element(by.id('totalpoints')).getText();
        this.highlightElement(by.id('totalpoints'));

        return todo;
    }

    hintButton(){
        let input = element(by.id('hint'));
        input.click();
    }

    nextCardButton(){
        let input = element(by.id('next'));
        input.click();
    }

    dontKnowButton(){
        let input = element(by.id('dontknow'));
        input.click();
    }

    resetButton(){
        let input = element(by.id('reset'));
        input.click();
    }
}
