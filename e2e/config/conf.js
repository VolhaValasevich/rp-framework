'use strict';
const args = require('../utils/paramsHelper');

exports.config = {
    directConnect: typeof process.env.SELENIUM_ADDRESS === "undefined",
    seleniumAddress: process.env.SELENIUM_ADDRESS,
    capabilities: args.getCapabilities(),
};
