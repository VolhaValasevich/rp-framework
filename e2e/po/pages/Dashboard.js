'use strict';
const Common = require('./ReportPortalPage');
const WebElement = require('../base/WebElement');
const Widget = require('../elements/Widget');
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
        await this.createDashboardModal.waitUntilGone();
    }

    async getCurrentID() {
        const url = await this.getCurrentUrl();
        return url.split('/').pop();
    }

    addWidget(name) {
        this[name] = new Widget(`.//div[contains(@class, "widgetsGrid__widget-view") and .//div[text()="${name}"]]`, 'xpath');
    }
}

module.exports = Dashboard;
