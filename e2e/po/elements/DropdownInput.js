'use strict'
const WebElement = require('../base/WebElement');
const logger = require('../../utils/Logger');

class DropdownInput extends WebElement {
    constructor(selector, type) {
        super(selector, type);

        this.currentValue = this.attach('.inputDropdown__value--2gB2s', 'css');
    }

    async selectOptionWithText(text) {
        logger.info(`Selecting [${text}] in [${this.selector}]`);
        await this.click();
        const optionWithText = this.attach(`.//div[contains(@class, "inputDropdownOption__single-option") and contains(text(), "${text}")]`, 'xpath');
        return optionWithText.click();
    }

    getCurrentValue() {
        return this.currentValue.getText();
    }
}

module.exports = DropdownInput;
