'use strict'
const WebElement = require('../base/WebElement');

class Modal extends WebElement {
    constructor(selector, type) {
        super(selector, type);
    }

    clickButtonByText(text) {
        const button = this.attach(`.//button[text()="${text}"]`, 'xpath');
        return button.click();
    }

}

module.exports = Modal;
