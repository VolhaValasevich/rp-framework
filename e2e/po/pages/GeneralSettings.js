'use strict';
const Settings = require('./Settings');
const WebElement = require('../base/WebElement');
const DropdownInput = require('../elements/DropdownInput');

class GeneralSettings extends Settings {
    constructor() {
        super('/general');

        this.nameInput = new WebElement('.//span[contains(text(), "Name")]/following-sibling::div[contains(@class, "field-input")]/input', 'xpath');
        this.timeoutInput = this.addDropdown('Launch inactivity timeout');
        this.keepLaunchesInput = this.addDropdown('Keep launches');
        this.keepLogsInput = this.addDropdown('Keep logs');
        this.keepAttachmentsInput = this.addDropdown('Keep attachments');
        this.submitButton = new WebElement('.generalTab__submit-button--1NatL > button', 'css');
    }

    addDropdown(text) {
        return new DropdownInput(`.//span[contains(text(), "${text}")]/following-sibling::div[contains(@class, "field-input")]/*`, 'xpath');
    }
}

module.exports = GeneralSettings;
