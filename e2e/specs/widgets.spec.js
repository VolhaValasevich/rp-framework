'use strict';

const pages = require('../po/PO');
const user = ENV_PARAMS.users[0];
const widgetTemplates = require('../data/widget.json');
const {verifyUserIsLoggedIn} = require('../utils/commonActions');
const ApiHelper = require('../utils/APIHelper');
const client = new ApiHelper()

describe(`[${user.role}] Report Portal Widgets Resizing`, () => {
    beforeAll(async () => {
        await verifyUserIsLoggedIn(user.login, user.password);
        await client.deleteAllDashboards(user);

        const dashboardId = await client.createDashboardForUser(user, 'widgets');
        await client.createWidgetOnDashboard(user, widgetTemplates.overallStatistics, dashboardId);
        await client.createWidgetOnDashboard(user, widgetTemplates.statisticTrend, dashboardId);

        pages.setCurrentPage('dashboard');
        await pages.page.get(user, dashboardId);
        await pages.page.isOpened();
        pages.page.addWidget("overallStatistics");
        pages.page.addWidget("statisticTrend");
    });

    it('should display widgets', async () => {
        const statisticTrend = await pages.page.statisticTrend.isDisplayed()
        expect(statisticTrend).toBe(true);
        const overallStatistics = await pages.page.overallStatistics.isDisplayed()
        expect(overallStatistics).toBe(true);
    })

    //afterEach(() => client.deleteAllDashboards(user))
})
