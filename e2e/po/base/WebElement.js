'use strict';
const driver = require('../../utils/Driver');
const logger = require('../../utils/Logger');

class WebElement {
    constructor(selector, type, parentFinder = null, isArray = false) {
        this.selector = `${selector} (${type})`
        this.finder = driver.getElementFinder(selector, type, parentFinder, isArray);
    }

    attach(selector, type) {
        return new WebElement(selector, type, this.finder);
    }

    isDisplayed() {
        logger.debug(`checking presence of (${this.selector})`);
        return this.finder.isDisplayed();
    }

    click() {
        logger.debug(`clicking on (${this.selector})`);
        return this.finder.click();
    }

    sendKeys(keys) {
        logger.debug(`typing [${keys}] in (${this.selector})`);
        return this.finder.sendKeys(keys);
    }

    async getText() {
        const text = await this.finder.getText();
        logger.debug(`Text in (${this.selector}) is [${text}]`);
        return text;
    }

    async getValue() {
        const value = await this.finder.getAttribute('value');
        logger.debug(`Value in (${this.selector}) is [${value}]`);
        return value;
    }

    waitUntilVisible() {
        logger.debug(`waiting for (${this.selector}) to become visible`);
        return driver.waitUntil(this.finder, 'visible');
    }

    waitUntilInvisible() {
        logger.debug(`waiting for (${this.selector}) to become invisible`);
        return driver.waitUntil(this.finder, 'invisible');
    }

    waitUntilGone() {
        logger.debug(`waiting for (${this.selector}) to disappear`);
        return driver.waitUntil(this.finder, 'gone');
    }
}

module.exports = WebElement;
