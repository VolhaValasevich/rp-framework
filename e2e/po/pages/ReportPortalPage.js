'use strict';
const Page = require('../base/Page');
const WebElement = require('../base/WebElement');

class Common extends Page {
    constructor(url) {
        super(url);

        this.userMenuIcon = new WebElement('[class*="userBlock__menu-icon"]', 'css');
        this.userName = new WebElement('[class*="userBlock__username"]', 'css');
        this.logoutLink = new WebElement('.//div[contains(@class, "userBlock__menu-item") and text()="Logout"]', 'xpath');
        this.notificationMessage = new WebElement('[class*="notificationItem__message-container"] > p', 'css');
    }

    get(user) {
        const url = `#${user}_personal${this.url}`;
        return super.get(url);
    }

    async isOpened() {

        return super.isOpened();
    }

    async executeLogout() {
        await this.userMenuIcon.click();
        return this.logoutLink.click();
    }
}

module.exports = Common;
