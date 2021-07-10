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

    getElementFinder(selector, type, parent, isArray) {
        const root = parent ? parent : this;
        if (isArray) return root.element.all(this.by[type](selector))
        return root.element(this.by[type](selector));
    }

    expectedCondition(shouldBe) {
        const obj = {
            present: protractor.ExpectedConditions.presenceOf.bind(protractor.ExpectedConditions),
            visible: protractor.ExpectedConditions.visibilityOf.bind(protractor.ExpectedConditions),
            invisible: protractor.ExpectedConditions.invisibilityOf.bind(protractor.ExpectedConditions),
            gone: protractor.ExpectedConditions.stalenessOf.bind(protractor.ExpectedConditions),
        }
        if (!obj[shouldBe]) {
            throw new Error(`[${shouldBe}] condition is not implemented`);
        }
        return obj[shouldBe];
    }

    waitUntil(element, shouldBe) {
        const condition = this.expectedCondition(shouldBe);
        return this.browser.wait(condition(element), timeouts.implicitlyWait);
    }

    isDisplayed(element) {
        return element.isDisplayed();
    }

    click(element) {
        return element.click();
    }

    sendKeys(element, keys) {
        return element.sendKeys(keys);
    }

    getText(element) {
        return element.getText();
    }

    getValue(element) {
        return element.getAttribute('value');
    }

    getCount(element) {
        return element.count();
    }

    getElementByIndex(element, index) {
        return element.get(index);
    }

    get(url) {
        logger.debug(`opening ${ENV_PARAMS.BASE_URL + url}`);
        return this.browser.get(ENV_PARAMS.BASE_URL + url);
    }

    getCurrentUrl() {
        logger.debug('getting current URL');
        return this.browser.getCurrentUrl();
    }

    openBaseUrl() {
        logger.debug(`opening ${ENV_PARAMS.BASE_URL}`);
        return this.browser.get(ENV_PARAMS.BASE_URL);
    }
}

module.exports = new Driver();
