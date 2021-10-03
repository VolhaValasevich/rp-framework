const APIClient = require("../utils/client");
const logger = require('../../e2e/utils/Logger');

class Dashboard {
    constructor(user) {
        this.client = new APIClient(`/api/v1/${user.defaultProject}/dashboard/`);
        this.headers = {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${user.token}`
        }
    }

    async create(name, description) {
        const body = {name};
        if (description) body.description = description;
        try {
            const response = await this.client.post("", body, this.headers);
            logger.info(`Created a new dashboard (name: ${name}, id: ${response.data.id})`);
            return response.data.id;
        } catch (e) {
            throw new Error(`Couldn't create a ${name} dashboard: ${e.response.data.message}`)
        }
    }

    async delete(dashboardId) {
        try {
            const response = await this.client.delete(dashboardId, this.headers);
            logger.info(response.data.message);
            return response;
        } catch (e) {
            throw new Error(`Couldn't delete a dashboard with [${dashboardId}] ID: ${e}`)
        }
    }

    async getAll() {
        try {
            const response = await this.client.get("", this.headers);
            return response.data.content;
        } catch (e) {
            throw new Error(`Couldn't get dashboards for user: ${e}`)
        }
    }

    async deleteAll() {
        try {
            const dashboards = await this.getAll();
            if (dashboards.length > 0) {
                logger.info("Deleting all dashboards");
                return Promise.all(dashboards.map(dashboard => this.delete(dashboard.id)))
            }
        } catch (e) {
            throw new Error(`Couldn't delete dashboards: ${e}`)
        }
    }

    async addWidget(widgetId, dashboardId) {
        try {
            const addWidgetRequest = {
                addWidget: {
                    widgetId,
                    widgetPosition: {
                        positionX: 0,
                        positionY: 0
                    },
                    widgetSize: {
                        height: 6,
                        width: 6
                    },
                }
            }
            const response = await this.client.put(`${dashboardId}/add`, addWidgetRequest, this.headers);
            logger.info(response.data.message);
        } catch (e) {
            throw new Error(`Couldn't create a ${name} widget: ${e.response.data.message}`)
        }
    }
}

module.exports = Dashboard;
