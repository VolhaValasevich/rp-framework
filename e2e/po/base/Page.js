'use strict';
const driver = require('../../utils/Driver');
const WebElement = require('./WebElement');
const logger = require('../../utils/Logger');

class Page {
    constructor(url) {
        this.url = url;
    }

    get() {
        return driver.get(this.url);
    }

    async isOpened() {
        const currentUrl = await driver.getCurrentUrl();
        logger.info(`current url is ${currentUrl}, should contain ${this.url}`);
        return currentUrl.includes(this.url);
    }

    attachElement(name, selector, type) {
        this[name] = new WebElement(selector, type);
    }
}

module.exports = Page;
