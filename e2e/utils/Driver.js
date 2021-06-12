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

    waitUntilVisible(selector) {
        logger.info(`waiting for [${selector}] to become present`);
        return this.browser.wait(protractor.ExpectedConditions.visibilityOf(this.findElement(selector)), timeouts.implicitlyWait);
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

    async getText(selector) {
        const text = await this.findElement(selector).getText();
        logger.info(`Text in [${selector}] is [${text}]`);
        return text;
    }

    async getValue(selector) {
        const value = await this.findElement(selector).getAttribute('value');
        logger.info(`Value in [${selector}] is [${value}]`);
        return value;
    }

    get(url) {
        logger.info(`opening ${this.browser.params.BASE_URL + url}`);
        return this.browser.get(this.browser.params.BASE_URL + url);
    }

    getCurrentUrl() {
        logger.info('getting current URL');
        return this.browser.getCurrentUrl();
    }

    openBaseUrl() {
        logger.info(`opening ${this.browser.params.BASE_URL}`);
        return this.browser.get(this.browser.params.BASE_URL);
    }
}

module.exports = new Driver();
