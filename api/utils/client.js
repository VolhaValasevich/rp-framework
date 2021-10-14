const axios = require('axios');
const normalize = require('normalize-url');
const logger = require('../../e2e/utils/Logger');

class APIClient {
    constructor(uri, headers) {
        this.client = axios.default;
        this.baseURL = normalize(`${ENV_PARAMS.BASE_URL}/${uri}`);
        this.defaultHeaders = headers;
    }

    get(uri, headers) {
        const url = normalize(`${this.baseURL}/${uri}`);
        const config = { headers: headers || this.defaultHeaders }
        logger.debug(`GET: ${url}`);
        return this.client.get(url, config);
    }

    post(uri, body, headers) {
        const url = normalize(`${this.baseURL}/${uri}`);
        const config = { headers: headers || this.defaultHeaders }
        logger.debug(`POST: ${url}`);
        return this.client.post(url, body, config);
    }

    delete(uri, headers) {
        const url = normalize(`${this.baseURL}/${uri}`);
        const config = { headers: headers || this.defaultHeaders }
        logger.debug(`DELETE: ${url}`);
        return this.client.delete(url, config);
    }

    put(uri, body, headers) {
        const url = normalize(`${this.baseURL}/${uri}`);
        const config = { headers: headers || this.defaultHeaders }
        logger.debug(`PUT: ${url}`);
        return this.client.put(url, body, config);
    }
}

module.exports = APIClient;

