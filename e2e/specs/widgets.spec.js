'use strict';

const pages = require('../po/PO');
const {verifyUserIsLoggedIn} = require('../utils/commonActions');

const DashboardAPI = require('../../api/models/dashboard');
const WidgetAPI = require('../../api/models/widget');
const widgetRequests = require('../../api/data/widgetRequests.json');

const user = ENV_PARAMS.users[0];
let dashboardId;

describe(`[${user.role}] Report Portal Widgets Resizing`, () => {
    const dashboardAPI = new DashboardAPI(user);
    const widgetAPI = new WidgetAPI(user);

    beforeAll(async () => {
        await verifyUserIsLoggedIn(user.login, user.password);
        await dashboardAPI.deleteAll();

        dashboardId = await dashboardAPI.create( 'widgets');

        const overallStatisticsId = await widgetAPI.create(widgetRequests.overallStatistics)
        await dashboardAPI.addWidget(overallStatisticsId, dashboardId);

        const statisticTrendId = await widgetAPI.create(widgetRequests.statisticTrend)
        await dashboardAPI.addWidget(statisticTrendId, dashboardId);

        pages.setCurrentPage('dashboard');
        await pages.page.get(user.login, dashboardId);
        await pages.page.isOpened();
        pages.page.addWidget("overallStatistics");
        pages.page.addWidget("statisticTrend");
    });

    it('should display widgets', async () => {
        const overallStatistics = await pages.page.overallStatistics.isDisplayed()
        expect(overallStatistics).toBe(true);
        const statisticTrend = await pages.page.statisticTrend.isDisplayed()
        expect(statisticTrend).toBe(true);
    })

    it('should change size of the widget and its content', async () => {
        const widgetSize = await pages.page.overallStatistics.getSize();
        const contentSize = await pages.page.overallStatistics.widgetContent.getSize();
        await pages.page.overallStatistics.resize({
            x: 200,
            y: 0
        })
        const newWidgetSize = await pages.page.overallStatistics.getSize();
        const newContentSize = await pages.page.overallStatistics.widgetContent.getSize();

        expect(newWidgetSize.width).toBeGreaterThan(widgetSize.width);
        expect(newContentSize.width).toBeGreaterThan(contentSize.width);
        expect(Math.round(newWidgetSize.height)).toBe(Math.round(widgetSize.height));
        expect(Math.round(newContentSize.height)).toBe(Math.round(contentSize.height));
    })

    it('should receive correct response while resizing', async () => {
        await pages.page.overallStatistics.resize({
            x: 200,
            y: 0
        })

        const response = await pages.page.waitForResponse(`/dashboard/${dashboardId}`);
        const isResponseStatusOk = await response.ok();
        let requestData = await response.request().postData();
        requestData = JSON.parse(requestData);
        const responseBody = await response.json();

        expect(isResponseStatusOk).toBe(true);
        expect(responseBody.message).toBe(`Dashboard with ID = '${dashboardId}' successfully updated`);
        expect(requestData.updateWidgets).toBeDefined();
        expect(requestData.updateWidgets.length).toBe(2);
    })

    it('should move other widgets while resizing', async () => {
        const secondWidgetSize = await pages.page.statisticTrend.getSize();
        await pages.page.overallStatistics.resize({
            x: 0,
            y: 200
        })
        const newSecondWidgetSize = await pages.page.statisticTrend.getSize();

        expect(newSecondWidgetSize.y).toBeGreaterThan(secondWidgetSize.y);
        expect(Math.round(newSecondWidgetSize.x)).toBe(Math.round(newSecondWidgetSize.x));
        expect(Math.round(newSecondWidgetSize.height)).toBe(Math.round(secondWidgetSize.height));
        expect(Math.round(newSecondWidgetSize.height)).toBe(Math.round(secondWidgetSize.height));
    })

    it('should not make the widget wider than the dashboard', async () => {
        const containerSize = await pages.page.widgetsContainer.getSize();
        await pages.page.overallStatistics.resize({
            x: 1000,
            y: 0
        })
        const widgetSize = await pages.page.overallStatistics.getSize();

        expect(widgetSize.width).toBeLessThan(containerSize.width);
    })

    afterAll(() => dashboardAPI.deleteAll())
})
