'use strict';
const path = require('path');
const args = require('../utils/paramsHelper');

exports.config = {
    framework: 'mocha',
    directConnect: typeof process.env.SELENIUM_ADDRESS === "undefined",
    seleniumAddress: process.env.SELENIUM_ADDRESS,
    capabilities: {
        browserName: 'chrome',
        'selenoid:options': {
            enableVNC: true,
            enableVideo: false
        }
    } ,
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
