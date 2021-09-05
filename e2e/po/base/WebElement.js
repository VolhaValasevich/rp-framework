'use strict';
const driver = require('../../utils/Driver');
const logger = require('../../utils/Logger');

class WebElement {
    constructor(selector, type, parentFinder = null, isArray = false) {
        this.selector = selector;
        this.type = type;
        this.parentFinder = parentFinder;
        this.isArray = isArray;
        this.finder = null;
    }

    async get() {
        await this.waitUntilVisible();
        this.finder = await driver.getElementHandle(this.selector, this.type, this.parentFinder, this.isArray);
    }

    attach(selector, type) {
        return new WebElement(selector, type, this.finder);
    }

    isDisplayed() {
        logger.debug(`checking visibility of (${this.selector})`);
        return driver.page.evaluate(selector => {
            const element = document.querySelector(selector);
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.visibility !== 'hidden' && !!(rect.bottom || rect.top || rect.height || rect.width);
        }, this.selector);
    }

    async click() {
        await this.get();
        logger.debug(`clicking on (${this.selector})`);
        return this.finder.click();
    }

    async sendKeys(keys) {
        await this.get();
        logger.debug(`typing [${keys}] in (${this.selector})`);
        return this.finder.type(keys);
    }

    async getText() {
        await this.get();
        const text = await driver.page.evaluate(element => element.textContent, this.finder);
        logger.debug(`Text in (${this.selector}) is [${text}]`);
        return text;
    }

    async getValue() {
        await this.get();
        const value = await driver.page.evaluate(element => element.getAttribute('value'), this.finder);
        logger.debug(`Value in (${this.selector}) is [${value}]`);
        return value;
    }

    waitUntilVisible() {
        logger.debug(`waiting for (${this.selector}) to become visible`);
        return driver.waitUntil(this.selector, 'visible');
    }

    waitUntilGone() {
        logger.debug(`waiting for (${this.selector}) to disappear`);
        return driver.waitUntil(this.selector, 'hidden');
    }
}

module.exports = WebElement;
