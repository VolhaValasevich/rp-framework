'use strict';
const Common = require('./CommonPage');

class Dashboard extends Common {
    constructor() {
        super('/dashboard');

        this.attachElement('dashboardToolbar', '[class*=\'dashboardPageToolbar\']', 'css');
    }

    async isOpened() {
        await this.dashboardToolbar.waitUntilPresent();
        return super.isOpened();
    }
}

module.exports = Dashboard;
