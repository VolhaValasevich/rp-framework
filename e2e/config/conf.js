'use strict';
const path = require('path');
const args = require('../utils/paramsHelper');

exports.config = {
    framework: 'mocha',
    directConnect: false,
    seleniumAddress: process.env.SELENIUM_ADDRESS || "http://localhost:4444/wd/hub",
    specs: [
        path.resolve('./e2e/specs/hooks.js'),
        path.resolve('./e2e/specs/*.spec.js')],
    mochaOpts: {
        timeout: 50000,
        reporter: 'mocha-junit-reporter',
        reporterOptions: {
            jenkinsMode: true,
            mochaFile: './reports/results.xml'
        },
        grep: args.getTags()
    },
};
