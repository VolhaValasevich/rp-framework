'use strict';
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
global.expect = chai.expect;

const driver = require('../utils/Driver');
const pages = require('../po/PO');

before("Setup hook", async () => {
    await driver.waitForAngularEnabled(false);
    await driver.maximizeWindow();
    await driver.openBaseUrl();
    pages.setCurrentPage('login');
});
