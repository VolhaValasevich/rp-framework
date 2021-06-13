'use strict';
const path = require('path');

exports.config = {
    framework: 'mocha',
    directConnect: true,
    specs: [path.resolve('./e2e/specs/*.js')],
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
    },
};
