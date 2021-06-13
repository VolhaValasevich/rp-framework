const axios = require('axios');
const normalize = require('normalize-url');
const logger = require('./Logger');
const {BASE_API} = require('../config/conf').config.params;

class APIHelper {
    constructor() {
        this.client = axios.default;
        this.baseURL = BASE_API;
    }

    sendGetRequest(uri) {
        const url = normalize(this.baseURL + uri);
        logger.debug(`GET: ${url}`);
        return this.client.get(url);
    }

    sendPostRequest(uri, body, token) {
        const url = normalize(this.baseURL + uri);
        logger.debug(`POST: ${url}`);
        return this.client.post(url, body, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });
    }

    sendDeleteRequest(uri, token) {
        const url = normalize(this.baseURL + uri);
        logger.debug(`DELETE: ${url}`);
        return this.client.delete(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });
    }

    async createDashboardForUser(user, name, description) {
        const body = {name};
        if (description) body.description = description;
        try {
            const response = await this.sendPostRequest(`/${user.defaultProject}/dashboard`, body, user.token);
            logger.info(`Created a new dashboard (name: ${name}, id: ${response.data.id})`);
            return response.data.id;
        } catch (e) {
            throw new Error(`Couldn't create a ${name} dashboard: ${e.response.data.message}`)
        }
    }

    async deleteDashboardForUser(user, dashboardId) {
        try {
            const response = await this.sendDeleteRequest(`/${user.defaultProject}/dashboard/${dashboardId}`, user.token);
            logger.info(`Deleted the dashboard with ${dashboardId} ID`);
            return response;
        } catch (e) {
            throw new Error(`Couldn't delete a dashboard with [${dashboardId}] ID: ${e.response.data.message}`)
        }
    }
}

module.exports = APIHelper;

