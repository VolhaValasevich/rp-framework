'use strict';

const pages = require('../po/PO');
const users = require('../data/users.json');
const {verifyUserIsLoggedIn} = require('../utils/commonActions');

users.forEach(user => {
    describe(`[${user.role}] Report Portal General Settings Page`, () => {
        before(async () => {
            await verifyUserIsLoggedIn(user.login, user.password);
            pages.setCurrentPage('generalSettings');
            await pages.page.get(user.login);
            return pages.page.isOpened();
        });

        it('should have necessary UI elements', async () => {
            await expect(pages.page.nameInput.isPresent()).to.eventually.be.true;
            await expect(pages.page.timeoutInput.isPresent()).to.eventually.be.true;
            await expect(pages.page.keepLaunchesInput.isPresent()).to.eventually.be.true;
            await expect(pages.page.keepLogsInput.isPresent()).to.eventually.be.true;
            await expect(pages.page.keepAttachmentsInput.isPresent()).to.eventually.be.true;
            await expect(pages.page.submitButton.isPresent()).to.eventually.be.true;
        })

        it('should display current username', async () => {
            await expect(pages.page.nameInput.getValue()).to.eventually.eql(`${user.login}_personal`);
        })

    })
});
