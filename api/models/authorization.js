const APIClient = require("../utils/client");

class Authorization {
    constructor(basicToken) {
        this.client = new APIClient(`${ENV_PARAMS.BASE_URL}/uat/`, {
            'Authorization': `Basic ${basicToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': ' application/json, text/plain, */*',
            'Accept-Encoding': 'gzip, deflate, br'
        });
    }

    async getToken(username, password) {
        try {
            const response = await this.client.post('/sso/oauth/token',
                `grant_type=password&username=${username}&password=${password}`,
            );
            return response.data.access_token;
        } catch (e) {
            throw new Error(`Couldn't get an access token: ${e.message}`)
        }
    }
}

module.exports = Authorization;
