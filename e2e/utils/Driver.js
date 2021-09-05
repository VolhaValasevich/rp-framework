'use strict';
const puppeteer = require('puppeteer');
const timeouts = require('../config/timeouts.json');
const logger = require('./Logger');

class Driver {
    constructor() {
        this.browser = null;
        this.page = null;
    }

    async start() {
        logger.info('starting driver');
        this.browser = await puppeteer.launch({
            headless: false,
            args: ['--start-maximized']
        });
        const pages = await this.browser.pages();
        this.page = pages[0];
        await this.page.setViewport({ width: 1366, height: 768});
    }

    stop() {
        logger.info('shutting down puppeteer');
        return this.browser.close();
    }

    takeScreenshot(path) {
        return this.page.screenshot({ path });
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
            hidden: shouldBe === 'hidden',
            timeout: timeouts.implicit
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
