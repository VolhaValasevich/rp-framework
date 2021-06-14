'use strict';
const driver = require('../../utils/Driver');
const logger = require('../../utils/Logger');

class WebElement {
    constructor(selector, type, parent = null, isArray = false) {
        this.selector = `${selector} (${type})`
        this.element = driver.getElementFinder(selector, type, parent, isArray);
    }

    isDisplayed() {
        logger.debug(`checking presence of (${this.selector})`);
        return driver.isDisplayed(this.element);
    }

    click() {
        logger.debug(`clicking on (${this.selector})`);
        return driver.click(this.element);
    }

    sendKeys(keys) {
        logger.debug(`typing [${keys}] in (${this.selector})`);
        return driver.sendKeys(this.element, keys);
    }

    async getText() {
        const text = await driver.getText(this.element);
        logger.debug(`Text in (${this.selector}) is [${text}]`);
        return text;
    }

    async getValue() {
        const value = await driver.getValue(this.element);
        logger.debug(`Value in (${this.selector}) is [${value}]`);
        return value;
    }

    waitUntilVisible() {
        logger.debug(`waiting for (${this.selector}) to become visible`);
        return driver.waitUntil(this.element, 'visible');
    }

    waitUntilInvisible() {
        logger.debug(`waiting for (${this.selector}) to become invisible`);
        return driver.waitUntil(this.element, 'invisible');
    }

    waitUntilGone() {
        logger.debug(`waiting for (${this.selector}) to disappear`);
        return driver.waitUntil(this.element, 'gone');
    }
}

module.exports = WebElement;
