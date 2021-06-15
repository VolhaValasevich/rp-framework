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
        return driver.isDisplayed(this.finder);
    }

    click() {
        logger.debug(`clicking on (${this.selector})`);
        return driver.click(this.finder);
    }

    sendKeys(keys) {
        logger.debug(`typing [${keys}] in (${this.selector})`);
        return driver.sendKeys(this.finder, keys);
    }

    async getText() {
        const text = await driver.getText(this.finder);
        logger.debug(`Text in (${this.selector}) is [${text}]`);
        return text;
    }

    async getValue() {
        const value = await driver.getValue(this.finder);
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
