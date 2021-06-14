'use strict';

const pages = require('../po/PO');
const users = ENV_PARAMS.users;
const {verifyUserIsLoggedIn} = require('../utils/commonActions');
const ApiHelper = require('../utils/APIHelper');
const client = new ApiHelper()

users.forEach(user => {
    describe(`[${user.role}] Report Portal Dashboard Page`, () => {
        before(async () => {
            await verifyUserIsLoggedIn(user.login, user.password);
            pages.setCurrentPage('dashboard');
            await pages.page.get(user.login);
            await pages.page.isOpened();
        });

        it('should create dashboard', async () => {
            await pages.page.createDashboard('TESTNAME', 'testDescription');
            await expect(pages.page.isOpened()).to.eventually.be.true;
            await expect(pages.page.breadcrumbs.getText()).to.eventually.contain('TESTNAME');
        })

        afterEach(async () => {
            const dashboardId = await pages.page.getCurrentID();
            return client.deleteDashboardForUser(user, dashboardId)
        })
    })
});
