'use strict';
const driver = require('../../utils/Driver');
const WebElement = require('./WebElement');
const logger = require('../../utils/Logger');

class Page {
    constructor(url) {
        this.url = url;
    }

    get(url = this.url) {
        return driver.get(url);
    }

    getCurrentUrl() {
        return driver.getCurrentUrl();
    }

    async isOpened() {
        const currentUrl = await this.getCurrentUrl();
        logger.info(`current url is ${currentUrl}, should contain ${this.url}`);
        return currentUrl.includes(this.url);
    }
}

module.exports = Page;
