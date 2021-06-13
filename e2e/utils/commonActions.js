'use strict'
const pages = require('../po/PO');

exports.verifyUserIsLoggedIn = async (name, password) => {
    const isLoginPageOpened = await pages.findPage('login').isOpened();
    if (!isLoginPageOpened) {
        const currentUserName = await pages.page.userName.getText();
        if (currentUserName === name.toUpperCase()) return;
        await pages.page.executeLogout();
    }
    pages.setCurrentPage('login');
    return pages.page.executeLogin(name, password);
}

exports.verifyUserIsLoggedOut = async () => {
    const isLoginPageOpened = await pages.findPage('login').isOpened();
    if (!isLoginPageOpened) {
        return pages.page.executeLogout();
    }
}

exports.closeNotificationMessages = async () => {
    const isMessageVisible = await pages.page.notificationMessage.isDisplayed();
    if (isMessageVisible) {
        await pages.page.notificationMessage.click();
        return pages.page.notificationMessage.waitUntilInvisible();
    }
}
