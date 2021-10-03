'use strict';
const Base = require('../base/Page');
const WebElement = require('../base/WebElement');
const logger = require('../../utils/Logger');
const AuthAPI = require('../../../api/models/authorization');

class Login extends Base {
    constructor() {
        super('#login');

        this.loginField = new WebElement('.loginForm__login-field--2NeYx input', 'css');
        this.passwordField = new WebElement('.loginForm__password-field--2IH1A input', 'css');
        this.loginButton = new WebElement('.loginForm__login-button-container--1mHGW button', 'css');
    }

    async isOpened() {
        await this.loginButton.waitUntilVisible();
        return super.isOpened();
    }

    async executeLogin(username, password) {
        logger.info(`executing login as [${username}]`);
        await this.loginField.sendKeys(username);
        await this.passwordField.sendKeys(password);
        return this.loginButton.click();
    }

    async executeAPILogin(username, password) {
        logger.info(`executing login via API as [${username}]`);
        const client = new AuthAPI();
        const basicToken = await this.getLocalStorageItem('token');
        const accessToken = await client.getToken(username, password, JSON.parse(basicToken).value);
        await this.setLocalStorageItem('token', `{"type": "bearer","value": "${accessToken}"}`);
        return this.reload();
    }
}

module.exports = Login;
