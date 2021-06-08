'use strict';
const Page = require('../base/Page');

class Common extends Page {
    constructor(url) {
        super(url);

        this.attachElement('userMenuIcon', '[class*=\'userBlock__menu-icon\']', 'css');
        this.attachElement('logoutLink', '//div[contains(@class, \'userBlock__menu-item\') and text()=\'Logout\']', 'xpath');
    }

    async executeLogout() {
        await this.userMenuIcon.click();
        return this.logoutLink.click();
    }
}

module.exports = Common;
