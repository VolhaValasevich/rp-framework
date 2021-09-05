'use strict';

const pages = require('../po/PO');
const users = ENV_PARAMS.users;
const {verifyUserIsLoggedOut} = require('../utils/commonActions');

describe('Report Portal Login Page', () => {
    beforeEach(async () => {
        await verifyUserIsLoggedOut();
        pages.setCurrentPage('login');
    });

    it('should open login page', async () => {
        await chai.expect(pages.page.isOpened()).to.eventually.be.true;
        await chai.expect(pages.page.loginField.isDisplayed()).to.eventually.be.true;
        await chai.expect(pages.page.passwordField.isDisplayed()).to.eventually.be.true;
    });

    describe('Login/Logout Functionality', () => {
        users.forEach(user => {
            it(`should login user as ${user.role}`, async () => {
                await pages.page.executeLogin(user.login, user.password);
                pages.setCurrentPage('dashboard');
                await chai.expect(pages.page.isOpened()).to.eventually.be.true;
                await chai.expect(pages.page.userMenuIcon.isDisplayed()).to.eventually.be.true;
            });
        });
    });
});
