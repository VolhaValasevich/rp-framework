'use strict';
const Login = require('./pages/Login');
const Dashboard = require('./pages/Dashboard');
const GeneralSettings = require('./pages/GeneralSettings');
const Launches = require('./pages/Launches');
const logger = require('../utils/Logger');

class PO {
    constructor() {
        this.pages = {
            login: new Login(),
            dashboard: new Dashboard(),
            generalSettings: new GeneralSettings(),
            launches: new Launches(),
        }
        this.page = null;
    }

    findPage(pageName) {
        if (pageName in this.pages) {
            return this.pages[pageName];
        }
        logger.error(`No ${pageName} page found in ${Object.keys(this.pages)}`);
    }

    setCurrentPage(pageName) {
        logger.info(`Setting current page to ${pageName}`);
        this.page = this.findPage(pageName);
    }
}

module.exports = new PO();
