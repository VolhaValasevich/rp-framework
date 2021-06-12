'use strict';
const chai = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
global.expect = chai.expect;

const driver = require('../utils/Driver');

before("Setup hook", () => {
    driver.waitForAngularEnabled(false);
    return driver.maximizeWindow();
});
