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

    waitForResponse(route) {
        return driver.page.waitForResponse(response => response.url().includes(route));
    }

    reload() {
        logger.info("refreshing the page");
        return driver.page.reload();
    }

    async getLocalStorageItem(key) {
        const item = await driver.page.evaluate((key) => localStorage.getItem(key), key);
        logger.debug(`Value of ${key} local storage item is ${item}`);
        return item;
    }

    setLocalStorageItem(key, value) {
        logger.debug(`Setting ${key} local storage item`);
        return driver.page.evaluate((key, value) => localStorage.setItem(key, value), key, value);
    }

    removeLocalStorageItem(key) {
        logger.debug(`Removing ${key} local storage item`);
        return driver.page.evaluate((key) => localStorage.removeItem(key), key);
    }

    async executeLogout() {
        logger.info('logging out of the application')
        await this.removeLocalStorageItem("token");
        return this.reload();
    }
}

module.exports = Page;
