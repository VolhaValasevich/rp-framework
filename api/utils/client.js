const axios = require('axios');
const normalize = require('normalize-url');
const logger = require('../../e2e/utils/Logger');

class APIClient {
    constructor(url, headers) {
        this.baseURL = normalize(url);
        this.client = axios.create({
            baseURL: this.baseURL,
            headers: headers
        });
    }

    get(uri) {
        const url = normalize(`${this.baseURL}/${uri}`);
        logger.debug(`GET: ${url}`);
        return this.client.get(uri);
    }

    post(uri, body) {
        const url = normalize(`${this.baseURL}/${uri}`);
        logger.debug(`POST: ${url}`);
        return this.client.post(uri, body);
    }

    delete(uri) {
        const url = normalize(`${this.baseURL}/${uri}`);
        logger.debug(`DELETE: ${url}`);
        return this.client.delete(uri);
    }

    put(uri, body) {
        const url = normalize(`${this.baseURL}/${uri}`);
        logger.debug(`PUT: ${url}`);
        return this.client.put(uri, body);
    }
}

module.exports = APIClient;

