'use strict'
const WebElement = require('../base/WebElement');

class Widget extends WebElement {
    constructor(selector, type) {
        super(selector, type);

        this.resizeButton = new WebElement('.react-resizable-handle', 'css');
        this.widgetContent = new WebElement('.widget__widget--mVI7B', 'css');
    }

    resize({x, y}) {
        return this.resizeButton.dragAndDrop({x, y})
    }
}

module.exports = Widget;
