'use strict';
const Common = require('./ReportPortalPage');
const WebElement = require('../base/WebElement');
const CreateDashboardModal = require('../elements/CreateDashboardModal');

class Dashboard extends Common {
    constructor() {
        super('/dashboard');

        this.dashboardToolbar = new WebElement('.dashboardPageToolbar__tool-bar--2emwS', 'css');
        this.newDashboardButton = new WebElement('.addDashboardButton__add-dashboard-btn--_w75i', 'css');
        this.createDashboardModal = new CreateDashboardModal();
    }

    async isOpened() {
        await this.newDashboardButton.waitUntilVisible();
        return super.isOpened();
    }

    async createDashboard(name, description) {
        await this.newDashboardButton.click();
        await this.createDashboardModal.waitUntilVisible();
        await this.createDashboardModal.fillDataAndCreate(name, description);
    }

    async getCurrentID() {
        const url = await this.getCurrentUrl();
        return url.split('/').pop();
    }
}

module.exports = Dashboard;
