'use strict';
const Common = require('./CommonPage');

class Login extends Common {
    constructor() {
        super('#login');

        this.attachElement('loginField', '[class*=\'login-field\'] input', 'css');
        this.attachElement('passwordField', '[class*=\'password-field\'] input', 'css');
        this.attachElement('loginButton', '[class*=\'login-button\'] button', 'css');
    }

    async executeLogin(username, password) {
        await this.loginField.sendKeys(username);
        await this.passwordField.sendKeys(password);
        return this.loginButton.click();
    }
}

module.exports = Login;
