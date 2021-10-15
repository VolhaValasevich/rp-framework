'use strict';
const PublicReportingAPI = require('@reportportal/agent-js-jasmine/lib/publicReportingAPI');
const driver = require('../utils/Driver');
const pages = require('../po/PO');
const path = require('path');
const jiraReporter = require('../utils/JiraReporter');

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
global.chai = chai;

const args = require('../utils/paramsHelper');
const env = args.getEnvironment();
const params = require(path.resolve('./config/env', env));
global.ENV_PARAMS = params;

beforeAll( async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL= 120000;
    await driver.start();
    await driver.openBaseUrl();
    pages.setCurrentPage('login');
});

beforeEach(() => jiraReporter.startProgress(jasmine.currentTest))

afterEach( async () => {
    if (jasmine.currentTest.failedExpectations.length > 0) {
        await jiraReporter.fail(jasmine.currentTest);
        const screenshot = await driver.takeScreenshot(jasmine.currentTest.fullName);
        const attachment = {
            name: 'screenshot.png',
            type: 'image/png',
            content: screenshot,
        }
        return PublicReportingAPI.error(`${jasmine.currentTest.fullName} failed: screenshot`, attachment)
    } else return jiraReporter.pass(jasmine.currentTest);
} );

afterAll(async () => {
    await driver.stop();
    return jasmine.RPAgent.getExitPromise();
});
