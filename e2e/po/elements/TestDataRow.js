'use strict'
const WebElement = require('../base/WebElement');

class TestDataRow extends WebElement {
    constructor(index) {
        super(`.//div[@class="gridRow__grid-row-wrapper--1dI9K"][${index}]`, 'xpath');

        this.dataTypes = ["total", "passed", "failed", "skipped", "product", "auto", "system", "investigate"];

        this.title = this.attach('.itemInfo__main-info--2HB9g > .itemInfo__name-link--1ItPc', 'css');

        this.total = this.attach('.//span[text()="total"]/following-sibling::a', 'xpath');
        this.passed = this.attach('.//span[text()="passed"]/following-sibling::a', 'xpath');
        this.failed = this.attach('.//span[text()="failed"]/following-sibling::a', 'xpath');
        this.skipped = this.attach('.//span[text()="skipped"]/following-sibling::a', 'xpath');
        this.product = this.attach('.//div[@class="defectStatistics__defect-statistics--1rZZJ" and .//span[text()="pb"]]//div[@class="donutChart__total--3QqJr"]', 'xpath');
        this.auto = this.attach('.//div[@class="defectStatistics__defect-statistics--1rZZJ" and .//span[text()="ab"]]//div[@class="donutChart__total--3QqJr"]', 'xpath');
        this.system = this.attach('.//div[@class="defectStatistics__defect-statistics--1rZZJ" and .//span[text()="si"]]//div[@class="donutChart__total--3QqJr"]', 'xpath');
        this.investigate = this.attach('.donutChart__total-to-investigate--3hcmq', 'css');
    }

    async getTestNumberFor(key) {
        if (this.dataTypes.includes(key)) {
            const isDataPresent = await this[key].isDisplayed();
            if (isDataPresent) {
                return this[key].getText();
            }
            return null;
        }
        throw new Error(`${key} data type isn't implemented in TestDataRow`)
    }

    async getAllTestData() {
        const data = {};
        for (let i in this.dataTypes) {
            const key = this.dataTypes[i];
            data[key] = await this.getTestNumberFor(key);
        }
        return data;
    }

    open() {
        return this.title.click();
    }
}

module.exports = TestDataRow;
