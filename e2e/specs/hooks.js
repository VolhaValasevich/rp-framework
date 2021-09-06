'use strict';
const driver = require('../utils/Driver');
const pages = require('../po/PO');
const path = require('path');

const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
global.chai = chai;

const args = require('../utils/paramsHelper');
const env = args.getEnvironment();
const params = require(path.resolve('./e2e/config/env', env));
global.ENV_PARAMS = params;

beforeAll( async () => {
    jasmine.DEFAULT_TIMEOUT_INTERVAL= 120000;
    await driver.start();
    await driver.openBaseUrl();
    pages.setCurrentPage('login');
});

afterEach( async () => {
    if (jasmine.currentTest.failedExpectations.length > 0) {
        await driver.takeScreenshot(jasmine.currentTest.fullName);
    }
} );

afterAll(() => driver.stop());
