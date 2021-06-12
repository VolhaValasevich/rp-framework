'use strict';
const Common = require('./ReportPortalPage');
const WebElement = require('../base/WebElement');

class Settings extends Common {
    constructor(url) {
        super(`/settings${url}`);

        this.settingsContainer = new WebElement('[class*=\'settingsPage__settings-page\']', 'css');
    }

    async isOpened() {
        await this.settingsContainer.waitUntilVisible();
        return super.isOpened();
    }
}

module.exports = Settings;
