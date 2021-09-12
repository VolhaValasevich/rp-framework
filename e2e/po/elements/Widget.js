'use strict'
const WebElement = require('../base/WebElement');

class Widget extends WebElement {
    constructor(selector, type) {
        super(selector, type);
    }
}

module.exports = Widget;
