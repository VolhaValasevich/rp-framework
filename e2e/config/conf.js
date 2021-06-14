'use strict';
const path = require('path');
const args = require('../utils/paramsHelper');

exports.config = {
    framework: 'mocha',
    directConnect: true,
    specs: [path.resolve('./e2e/specs/*.js')],
    capabilities: args.getCapabilities(),
    params: {
        BASE_URL: 'http://localhost:8080/ui/',
        BASE_API: 'http://localhost:8080/api/v1',
    },
    mochaOpts: {
        timeout: 50000,
        reporter: 'mochawesome-screenshots',
        reporterOptions: {
            reportDir: 'reports',
            clearOldScreenshots: true,
        },
        grep: args.getTags()
    },
};
