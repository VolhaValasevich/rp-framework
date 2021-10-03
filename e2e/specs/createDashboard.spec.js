'use strict';

const pages = require('../po/PO');
const users = ENV_PARAMS.users;
const {verifyUserIsLoggedIn} = require('../utils/commonActions');
const DashboardAPI = require('../../api/models/dashboard');

users.forEach(user => {
    const dashboardAPI = new DashboardAPI(user);

    describe(`[${user.role}] Report Portal Dashboard Page`, () => {
        beforeAll(async () => {
            await verifyUserIsLoggedIn(user.login, user.password);
            pages.setCurrentPage('dashboard');
            await pages.page.get(user.login);
            await pages.page.isOpened();
        });

        it('should create dashboard', async () => {
            await pages.page.createDashboard('TESTNAME', 'testDescription');
            await chai.expect(pages.page.isOpened()).to.eventually.be.true;
            await chai.expect(pages.page.breadcrumbs.getText()).to.eventually.contain('TESTNAME');
        })

        afterEach(() => dashboardAPI.deleteAll())
    })
});
