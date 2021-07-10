'use strict';
const Page = require('../base/Page');
const WebElement = require('../base/WebElement');
const WebElementArray = require('../base/WebElementArray');
const logger = require('../../utils/Logger');

class Common extends Page {
    constructor(url) {
        super(url);

        this.userMenuIcon = new WebElement('.userBlock__menu-icon--_7G3G', 'css');
        this.userName = new WebElement('.userBlock__username--2ZkIV', 'css');
        this.logoutLink = new WebElement('.//div[contains(@class, "userBlock__menu-item") and text()="Logout"]', 'xpath');
        this.notificationMessages = new WebElementArray('.notificationItem__message-container--16jY2 > p', 'css');
        this.successMessage = new WebElement('.notificationItem__success--Xv97a > p', 'css');
        this.breadcrumbs = new WebElement('.pageBreadcrumbs__page-breadcrumbs--29rem', 'css');
    }

    get(user) {
        const url = `#${user}_personal${this.url}`;
        return super.get(url);
    }

    async isOpened() {
        return super.isOpened();
    }

    async executeLogout() {
        logger.info('logging out of the application')
        await this.userMenuIcon.click();
        return this.logoutLink.click();
    }
}

module.exports = Common;
