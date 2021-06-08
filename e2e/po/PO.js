'use strict';
const Login = require('./pages/Login');
const Dashboard = require('./pages/Dashboard');
const logger = require('../utils/Logger');

class PO {
    constructor() {
        this.login = new Login();
        this.dashboard = new Dashboard();
        this.page = null;
    }

    findPage(pageName) {
        switch (pageName) {
        case 'Login':
            return this.login;
        case 'Dashboard':
            return this.dashboard;
        default: {
            logger.error(`No ${pageName} page found`);
            break;
        }
        }
    }

    setCurrentPage(pageName) {
        logger.info(`Setting current page to ${pageName}`);
        this.page = this.findPage(pageName);
    }
}

module.exports = new PO();
