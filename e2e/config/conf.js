'use strict';
const path = require('path');
const args = require('../utils/paramsHelper');

exports.config = {
    framework: 'mocha',
    directConnect: true,
    specs: [
        path.resolve('./e2e/specs/hooks.js'),
        path.resolve('./e2e/specs/*.spec.js')],
    params: {
        BASE_URL: 'http://localhost:8080/ui/',
        BASE_API: 'http://localhost:8080/api/v1',
    },
    mochaOpts: {
        timeout: 50000,
        reporter: 'mocha-junit-reporter',
        reporterOptions: {
            mochaFile: './reports/results.xml'
        },
        grep: args.getTags()
    },
};
