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
        await this.get()
        const count = this.finder.length;
        logger.warn(`Count of (${this.selector}) is [${count}]`);
        return count;
    }

    async clickByIndex(index) {
        logger.debug(`Clicking on #${index} of (${this.selector})`);
        await this.get();
        return this.finder[index].click();
    }
}

module.exports = WebElementArray;
