'use strict';
const driver = require('../../utils/Driver');

class WebElement {
    constructor(selector, type) {
        this.selector = driver.by[type](selector);
    }

    isPresent() {
        return driver.isPresent(this.selector);
    }

    click() {
        return driver.click(this.selector);
    }

    sendKeys(keys) {
        return driver.sendKeys(this.selector, keys);
    }

    getText() {
        return driver.getText(this.selector);
    }

    getValue() {
        return driver.getValue(this.selector);
    }

    waitUntilVisible() {
        return driver.waitUntilVisible(this.selector);
    }
}

module.exports = WebElement;
