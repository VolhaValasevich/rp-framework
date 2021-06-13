'use strict'
const WebElement = require('../base/WebElement');

class Modal extends WebElement {
    constructor(selector, type) {
        super(selector, type);
    }

    clickButtonByText(text) {
        const button = new WebElement(`.//button[text()="${text}"]`, 'xpath', this.element);
        return button.click();
    }

}

module.exports = Modal;
