'use strict'
const WebElement = require('./WebElement');
const driver= require('../../utils/Driver');
const logger= require('../../utils/Logger');

class WebElementArray extends WebElement {
    constructor(selector, type, parent) {
        super(selector, type, parent, true);
    }

    async getCount() {
        const count = await driver.getCount(this.element);
        logger.debug(`Count of (${this.selector}) is [${count}]`);
        return count;
    }

    async clickByIndex(index) {
        logger.debug(`Clicking on #${index} of (${this.selector})`);
        const requiredElement = await driver.getElementByIndex(this.element, index);
        return driver.click(requiredElement);
    }
}

module.exports = WebElementArray;
