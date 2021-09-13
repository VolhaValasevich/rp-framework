'use strict';
const driver = require('../../utils/Driver');
const logger = require('../../utils/Logger');

class WebElement {
    constructor(selector, type, parent = null, isArray = false) {
        this.selector = selector;
        this.type = type;
        this.parent = parent;
        this.isArray = isArray;
        this.finder = null;
    }

    async get() {
        let parentFinder = null;
        if (this.parent !== null) {
            await this.parent.get();
            parentFinder = this.parent.finder;
        }
        this.finder = await driver.getElementHandle(this.selector, this.type, parentFinder, this.isArray);
        if (!this.isArray && this.type === 'xpath') this.finder = this.finder[0];
    }

    attach(selector, type) {
        return new WebElement(selector, type, this);
    }

    isDisplayed() {
        logger.debug(`checking visibility of (${this.selector})`);
        return driver.page.evaluate((selector, type) => {
            let element;
            if (type === 'xpath') {
                element = document.evaluate(selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue
            } else element = document.querySelector(selector);
            if (!element) return false;
            const style = getComputedStyle(element);
            const rect = element.getBoundingClientRect();
            return style.visibility !== 'hidden' && !!(rect.bottom || rect.top || rect.height || rect.width);
        }, this.selector, this.type);
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
        return driver.waitUntil(this.selector, this.type, 'visible');
    }

    waitUntilGone() {
        logger.debug(`waiting for (${this.selector}) to disappear`);
        return driver.waitUntil(this.selector, this.type, 'hidden');
    }

    async getSize() {
        await this.get();
        return this.finder.boundingBox();
    }

    async dragAndDrop({x, y}) {
        const boundingBox = await this.getSize();
        const mouse = driver.page.mouse;
        await mouse.move(boundingBox.x + boundingBox.width / 2, boundingBox.y + boundingBox.height / 2);
        await mouse.down();
        await mouse.move(boundingBox.x + x, boundingBox.y + y);
        await mouse.up();
    }
}

module.exports = WebElement;
