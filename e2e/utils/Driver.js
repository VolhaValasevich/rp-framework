'use strict';
const protractor = require('protractor');
const timeouts = require('../config/timeouts.json');
const logger = require('./Logger');

class Driver {
    constructor() {
        this.browser = protractor.browser;
        this.by = protractor.By;
        this.element = protractor.element;
    }

    waitForAngularEnabled(value) {
        return this.browser.waitForAngularEnabled(value);
    }

    maximizeWindow() {
        return this.browser.driver.manage().window().maximize();
    }

    findElement(selector) {
        return this.element(selector);
    }

    waitUntilPresent(selector) {
        logger.info(`waiting for [${selector}] to become present`);
        return this.browser.wait(protractor.ExpectedConditions.presenceOf(this.findElement(selector)), timeouts.implicitlyWait);
    }

    isPresent(selector) {
        logger.info(`checking presence of [${selector}]`);
        return this.findElement(selector).isDisplayed();
    }

    click(selector) {
        logger.info(`clicking on [${selector}]`);
        return this.findElement(selector).click();
    }

    sendKeys(selector, keys) {
        logger.info(`typing [${keys}] in [${selector}]`);
        return this.findElement(selector).sendKeys(keys);
    }

    get(url) {
        logger.info(`opening ${this.browser.params.BASE_URL + url}`);
        return this.browser.get(this.browser.params.BASE_URL + url);
    }

    getCurrentUrl() {
        logger.info('getting current URL');
        return this.browser.getCurrentUrl();
    }
}

module.exports = new Driver();
