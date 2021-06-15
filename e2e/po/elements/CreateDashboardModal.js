'use strict'
const WebElement = require('../base/WebElement');
const Modal = require('./Modal');
const logger = require('../../utils/Logger');

class CreateDashboardModal extends Modal {
    constructor() {
        super('.//div[contains(@class, "modal-window") and .//form[contains(@class, "add-dashboard-form")]]', 'xpath');

        this.dashboardNameInput = this.attach('.//div[contains(@class, "modal-field--") and .//span[text()="Name"]]//input', 'xpath');
        this.dashboardDescriptionInput = this.attach('.//div[contains(@class, "modal-field--") and .//span[text()="Description"]]//textarea', 'xpath');
    }

    async fillDataAndCreate(name, description) {
        logger.info(`Creating new dashboard (name: ${name}${description ? `, description: ${description}` : ''})`);
        await this.dashboardNameInput.sendKeys(name);
        if (description) await this.dashboardDescriptionInput.sendKeys(description);
        return this.clickButtonByText('Add');
    }
}

module.exports = CreateDashboardModal;
