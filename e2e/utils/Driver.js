'use strict';
const fs = require("fs");
const path = require("path");
const puppeteer = require('puppeteer');
const {config} = require('../config/config');
const logger = require('./Logger');

class Driver {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async start() {
        logger.warn('starting puppeteer');
        this.browser = await puppeteer.launch(config.browserOptions);
        const pages = await this.browser.pages();
        this.page = pages[0];
    }

    stop() {
        logger.warn('shutting down puppeteer');
        return this.browser.close();
    }

    async takeScreenshot(specName) {
        const filename = specName.replace(/[^a-z0-9.-]+/gi, '_');
        if (!fs.existsSync(config.screenshotOptions.folder)){
            fs.mkdirSync(config.screenshotOptions.folder);
        }
        try {
            await this.page.screenshot({
                fullPage: config.screenshotOptions.fullPage,
                path: path.resolve(config.screenshotOptions.folder, `${filename}.${config.screenshotOptions.format}`)
            });
            logger.warn(`${specName} failed: taken screenshot`);
        } catch (e) {
            logger.error(`Could not take a screenshot: ${e.message}`);
        }

    }

    getElementHandle(selector, type, parent, isArray) {
        const root = parent ? parent : this.page;
        if (type === 'xpath') return root.$x(selector);
        else if (isArray) return root.$$(selector)
        else return root.$(selector);
    }

    waitUntil(selector, type, shouldBe) {
        const options = {
            visible: shouldBe === 'visible',
            hidden: shouldBe === 'hidden'
        };
        if (type === 'xpath') return this.page.waitForXPath(selector, options);
        return this.page.waitForSelector(selector, options);
    }

    get(url) {
        logger.debug(`opening ${ENV_PARAMS.BASE_URL + url}`);
        return this.page.goto(ENV_PARAMS.BASE_URL + url);
    }

    getCurrentUrl() {
        logger.debug('getting current URL');
        return this.page.url();
    }

    openBaseUrl() {
        logger.debug(`opening ${ENV_PARAMS.BASE_URL}`);
        return this.page.goto(ENV_PARAMS.BASE_URL);
    }
}

module.exports = new Driver();
