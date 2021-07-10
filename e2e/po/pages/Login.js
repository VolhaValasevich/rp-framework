'use strict';
const Base = require('../base/Page');
const WebElement = require('../base/WebElement');
const logger = require('../../utils/Logger');

class Login extends Base {
    constructor() {
        super('#login');

        this.loginField = new WebElement('.loginForm__login-field--2NeYx input', 'css');
        this.passwordField = new WebElement('.loginForm__password-field--2IH1A input', 'css');
        this.loginButton = new WebElement('.loginForm__login-button-container--1mHGW button', 'css');
    }

    async executeLogin(username, password) {
        logger.info(`executing login as [${username}]`);
        await this.loginField.sendKeys(username);
        await this.passwordField.sendKeys(password);
        return this.loginButton.click();
    }
}

module.exports = Login;
