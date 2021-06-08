'use strict';

const pages = require('../po/PO');
const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
const expect = chai.expect;
const users = require('../data/users.json');

describe('Report Portal Login Page', () => {
    beforeEach(() => {
        pages.setCurrentPage('Login');
        return pages.page.get();
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
                pages.setCurrentPage('Dashboard');
                await expect(pages.page.isOpened()).to.eventually.eql(true, 'page wasn\'t opened');
                await expect(pages.page.userMenuIcon.isPresent()).to.eventually.eql(true, 'user icon wasn\'t present');
            });
        });

        afterEach(async () => {
            const isLoggedIn = await pages.page.userMenuIcon.isPresent();
            if (isLoggedIn) {
                return pages.page.executeLogout();
            }
        });
    });
});
