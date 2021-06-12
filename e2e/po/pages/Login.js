'use strict';
const Base = require('../base/Page');
const WebElement = require('../base/WebElement');

class Login extends Base {
    constructor() {
        super('#login');

        this.loginField = new WebElement('[class*=\'login-field\'] input', 'css');
        this.passwordField = new WebElement('[class*=\'password-field\'] input', 'css');
        this.loginButton = new WebElement('[class*=\'login-button\'] button', 'css');
    }

    async executeLogin(username, password) {
        await this.loginField.sendKeys(username);
        await this.passwordField.sendKeys(password);
        return this.loginButton.click();
    }
}

module.exports = Login;
