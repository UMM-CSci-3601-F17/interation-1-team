import {browser, element, by} from 'protractor';
import {Key} from "selenium-webdriver";

export class HomePage {
    navigateTo() {
        return browser.get('/');
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

    getLogo() {
        let todo = element(by.id('i-am-sage')).getText();
        this.highlightElement(by.id('i-am-sage'));

        return todo;
    }

    getExplaination() {
        let todo = element(by.id('sageexplain')).getText();
        this.highlightElement(by.id('sageexplain'));

        return todo;
    }

    getPlayButton() {
        let todo = element(by.id('playbutton')).getText();
        this.highlightElement(by.id('playbutton'));

        return todo;
    }

    getAddACardButton() {
        let todo = element(by.id('addcardbutton')).getText();
        this.highlightElement(by.id('addcardbutton'));

        return todo;
    }
}
