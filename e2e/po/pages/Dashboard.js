'use strict';
const Common = require('./ReportPortalPage');
const WebElement = require('../base/WebElement');

class Dashboard extends Common {
    constructor() {
        super('/dashboard');

        this.dashboardToolbar = new WebElement('[class*=\'dashboardPageToolbar\']', 'css');
    }

    async isOpened() {
        await this.dashboardToolbar.waitUntilVisible();
        return super.isOpened();
    }
}

module.exports = Dashboard;
