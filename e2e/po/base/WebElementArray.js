'use strict'
const WebElement = require('./WebElement');
const driver= require('../../utils/Driver');
const logger= require('../../utils/Logger');

class WebElementArray extends WebElement {
    constructor(selector, type, parent) {
        super(selector, type, parent, true);
    }

    attach(selector, type) {
        return new WebElementArray(selector, type, this.finder);
    }

    async getCount() {
        const count = await this.finder.count();
        logger.debug(`Count of (${this.selector}) is [${count}]`);
        return count;
    }

    async clickByIndex(index) {
        logger.debug(`Clicking on #${index} of (${this.selector})`);
        return this.finder.get(index).click();
    }
}

module.exports = WebElementArray;
