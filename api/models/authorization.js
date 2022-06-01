const APIClient = require("../utils/client");

class Authorization {
    constructor() {
        this.client = new APIClient("/uat/");
    }

    async getToken(username, password, basicToken) {
        try {
            const response = await this.client.post('/sso/oauth/token',
                `grant_type=password&username=${username}&password=${password}`,
                {
                    'Authorization': `Basic ${basicToken}`,
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Accept': ' application/json, text/plain, */*',
                    'Accept-Encoding': 'gzip, deflate, br'
                }
            );
            return response.data.access_token;
        } catch (e) {
            throw new Error(`Couldn't get an access token: ${e.response.data.message}`)
        }
    }
}

module.exports = Authorization;
