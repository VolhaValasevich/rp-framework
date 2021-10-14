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
    return pages.page.executeAPILogin(name, password);
}

exports.verifyUserIsLoggedOut = async () => {
    return pages.page.executeLogout();
}

exports.closeNotificationMessages = async () => {
    let count = await pages.page.notificationMessages.getCount();
    while (count > 0) {
        await pages.page.notificationMessages.clickByIndex(0);
        await pages.page.notificationMessages.waitUntilGone();
        count = await pages.page.notificationMessages.getCount();
    }
}
