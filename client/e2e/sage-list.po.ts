import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class SagePage {
    navigateTo() {
        return browser.get('/addcards');
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

    getAddCardTitle() {
        let title = element(by.id('NewCardTitle')).getText();
        this.highlightElement(by.id('NewCardTitle'));

        return title;
    }

    addAWord(word: string){
        let input = element(by.id('newsageword'));
        input.click();
        input.sendKeys(word);
    }

    addASynonym(synonym: string){
        let input = element(by.id('newsagesynonym'));
        input.click();
        input.sendKeys(synonym);
        input.sendKeys(Key.ENTER);
    }

    addAAntonym(antonym: string){
        let input = element(by.id('newsageantonym'));
        input.click();
        input.sendKeys(antonym);
    }

    addAGenSense(gensense: string){
        let input = element(by.id('newsagegensense'));
        input.click();
        input.sendKeys(gensense);
    }

    addAExample(example: string){
        let input = element(by.id('newsageexample'))
        input.click();
        input.sendKeys(example);
    }

    addCardButton(){
        let input = element(by.id('addsagebutton'));
        input.click();
    }

    getAddCardsTitle() {
        let title = element(by.id('sage-list-title')).getText();
        this.highlightElement(by.id('sage-list-title'));

        return title;
    }

    getFirstCard() {
        let todo = element(by.id('sages')).getText();
        this.highlightElement(by.id('sages'));

        return todo;
    }
}
