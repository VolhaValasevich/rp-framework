'use strict';

const pages = require('../po/PO');
const users = require('../data/users.json');
const {verifyUserIsLoggedOut} = require('../utils/commonActions');

describe('Report Portal Login Page', () => {
    beforeEach(async () => {
        await verifyUserIsLoggedOut();
        pages.setCurrentPage('login');
    });

    it('should open login page', async () => {
        await expect(pages.page.isOpened()).to.eventually.be.true;
        await expect(pages.page.loginField.isPresent()).to.eventually.be.true;
        await expect(pages.page.passwordField.isPresent()).to.eventually.be.true;
    });

    describe('Login/Logout Functionality', () => {
        users.forEach(user => {
            it(`should login user as ${user.role}`, async () => {
                await pages.page.executeLogin(user.login, user.password);
                pages.setCurrentPage('dashboard');
                await expect(pages.page.isOpened()).to.eventually.eql(true, 'page wasn\'t opened');
                await expect(pages.page.userMenuIcon.isPresent()).to.eventually.eql(true, 'user icon wasn\'t present');
            });
        });
    });
});
