const axios = require('axios');
const normalize = require('normalize-url');
const logger = require('../../e2e/utils/Logger');

class APIClient {
    constructor(uri) {
        this.client = axios.default;
        this.baseURL = normalize(`${ENV_PARAMS.BASE_URL}/${uri}`);
    }

    get(uri, headers) {
        const url = normalize(`${this.baseURL}/${uri}`);
        logger.debug(`GET: ${url}`);
        return this.client.get(url, {headers});
    }

    post(uri, body, headers) {
        const url = normalize(`${this.baseURL}/${uri}`);
        logger.debug(`POST: ${url}`);
        return this.client.post(url, body, {headers});
    }

    delete(uri, headers) {
        const url = normalize(`${this.baseURL}/${uri}`);
        logger.debug(`DELETE: ${url}`);
        return this.client.delete(url, {headers});
    }

    put(uri, body, headers) {
        const url = normalize(`${this.baseURL}/${uri}`);
        logger.debug(`PUT: ${url}`);
        return this.client.put(url, body, {headers});
    }
}

module.exports = APIClient;

