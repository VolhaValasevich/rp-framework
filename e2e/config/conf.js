'use strict';
const path = require('path');

exports.config = {
    framework: 'mocha',
    directConnect: true,
    specs: [path.resolve('./e2e/specs/*.js')],
    params: {
        BASE_URL: 'http://localhost:8080/ui/',
    },
    mochaOpts: {
        timeout: 50000,
        reporter: 'mochawesome',
    },
};
