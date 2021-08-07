'use strict';
const path = require('path');
const args = require('../utils/paramsHelper');
const JasmineReporters = require("jasmine-reporters");

exports.config = {
    framework: 'jasmine',
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
    jasmineNodeOpts: {
        print: () => null,
        grep: args.getTags(),
    },
    onPrepare: () => {
        jasmine.getEnv().addReporter(new JasmineReporters.JUnitXmlReporter({
            consolidateAll: true,
            savePath: './reports/junit',
        }));
        jasmine.getEnv().addReporter(new JasmineReporters.TerminalReporter({
            verbosity: 3,
            color: true,
            showStack: true
        }));
    }
};
