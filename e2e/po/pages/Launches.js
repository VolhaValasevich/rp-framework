'use strict';
const Common = require('./ReportPortalPage');
const WebElement = require('../base/WebElement');
const WebElementArray = require('../base/WebElementArray');
const TestDataRow = require('../elements/TestDataRow');

class Launches extends Common {
    constructor() {
        super('/launches');

        this.launches = new WebElementArray('.gridRow__grid-row-wrapper--1dI9K', 'css');
        this.toolbar = new WebElement('.launchToolbar__launch-toolbar--2uoSS', 'css')

    }

    async isOpened() {
        await this.toolbar.waitUntilVisible();
        return super.isOpened();
    }

    getAllDataFromLaunchByIndex(index) {
        const launch = new TestDataRow(index + 1);
        return launch.getAllTestData();
    }

}

module.exports = Launches;
