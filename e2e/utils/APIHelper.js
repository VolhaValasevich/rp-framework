const axios = require('axios');
const normalize = require('normalize-url');
const logger = require('./Logger');
const {BASE_API} = ENV_PARAMS;

class APIHelper {
    constructor() {
        this.client = axios.default;
        this.baseURL = BASE_API;
    }

    sendGetRequest(uri, token) {
        const url = normalize(this.baseURL + uri);
        logger.debug(`GET: ${url}`);
        return this.client.get(url, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `bearer ${token}`
            }
        });
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

    sendPutRequest(uri, body, token) {
        const url = normalize(this.baseURL + uri);
        logger.debug(`PUT: ${url}`);
        return this.client.put(url, body, {
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
            logger.info(response.data.message);
            return response;
        } catch (e) {
            throw new Error(`Couldn't delete a dashboard with [${dashboardId}] ID: ${e}`)
        }
    }

    async getAllDashboards(user) {
        try {
            const response = await this.sendGetRequest(`/${user.defaultProject}/dashboard`, user.token);
            return response.data.content;
        } catch (e) {
            throw new Error(`Couldn't get dashboards for user: ${e}`)
        }
    }

    async deleteAllDashboards(user) {
        try {
            const dashboards = await this.getAllDashboards(user);
            if (dashboards.length > 0) {
                logger.info("Deleting all dashboard for user");
                return Promise.all(dashboards.map(dashboard => this.deleteDashboardForUser(user, dashboard.id)))
            }
        } catch (e) {
            throw new Error(`Couldn't delete dashboards for user: ${e}`)
        }
    }

    async createNewWidget(user, request) {
        try {
            const response = await this.sendPostRequest(`/${user.defaultProject}/widget/`, request, user.token);
            logger.info(`Created a new widget (id: ${response.data.id})`);
            return response.data.id;
        } catch (e) {
            throw new Error(`Couldn't create a widget: ${e.response.data.message}`)
        }
    }

    async addWidgetOnDashboard(user, request, dashboardId) {
        try {
            const response = await this.sendPutRequest(`/${user.defaultProject}/dashboard/${dashboardId}/add`, request, user.token);
            logger.info(response.data.message);
        } catch (e) {
            throw new Error(`Couldn't create a ${name} widget: ${e.response.data.message}`)
        }
    }

    async createWidgetOnDashboard(user, widgetRequest, dashboardId) {
        const widgetId = await this.createNewWidget(user, widgetRequest);
        const addWidgetRequest = {
            addWidget: {
                widgetId,
                widgetName: widgetRequest.name,
                widgetPosition: {
                    positionX: 0,
                    positionY: 0
                },
                widgetSize: {
                    height: 6,
                    width: 6
                },
                widgetType: widgetRequest.widgetType
            }
        }
        await this.addWidgetOnDashboard(user, addWidgetRequest, dashboardId);
    }
}

module.exports = APIHelper;

