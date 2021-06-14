'use strict';

const pages = require('../po/PO');
const users = ENV_PARAMS.users;
const data = require('../data/generalSettings.json');
const {verifyUserIsLoggedIn, closeNotificationMessages} = require('../utils/commonActions');

users.forEach(user => {
    describe(`[${user.role}] Report Portal General Settings Page`, () => {
        before(async () => {
            await verifyUserIsLoggedIn(user.login, user.password);
            pages.setCurrentPage('generalSettings');
            await pages.page.get(user.login);
            await pages.page.isOpened();
        });

        it('should have necessary UI elements', async () => {
            await expect(pages.page.nameInput.isDisplayed()).to.eventually.be.true;
            for (const setting of data.availableSettings) {
                const isPresent = await pages.page[`${setting.key}Input`].isDisplayed();
                await expect(isPresent).to.eql(true, `${setting.key} input is not present`)
            }
            await expect(pages.page.submitButton.isDisplayed()).to.eventually.be.true;
        })

        it('should display current username', () => {
            return expect(pages.page.nameInput.getValue()).to.eventually.eql(`${user.login}_personal`);
        })

        describe('Changing of general settings', () => {
            beforeEach(() => closeNotificationMessages());

            data.availableSettings.forEach(setting => {
                setting.options.forEach(option => {
                    it(`should set [${option}] in [${setting.key}] input`, async () => {
                        await pages.page[`${setting.key}Input`].selectOptionWithText(option);
                        await pages.page.submitButton.click();
                        await expect(pages.page[`${setting.key}Input`].getCurrentValue()).to.eventually.eql(option)
                        await pages.page.successMessage.waitUntilVisible();
                        return expect(pages.page.successMessage.getText()).to.eventually.eql(data.expectedNotificationText);
                    })
                })
            })
        })
    })
});
