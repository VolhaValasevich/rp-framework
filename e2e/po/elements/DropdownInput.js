'use strict'
const WebElement = require('../base/WebElement');
const logger = require('../../utils/Logger');

class DropdownInput extends WebElement {
    constructor(selector, type) {
        super(selector, type);
    }

    async selectOptionWithText(text) {
        logger.info(`Selecting [${text}] in [${this.selector}]`);
        await this.click();
        const optionWithText = new WebElement(`//div[contains(@class, "inputDropdownOption__single-option") and contains(text(), "${text}")]`, 'xpath');
        await optionWithText.waitUntilVisible();
        return optionWithText.click();
    }

}

module.exports = DropdownInput;
