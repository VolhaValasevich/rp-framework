const APIClient = require("../utils/client");
const logger = require('../../e2e/utils/Logger');

class Widget {
    constructor(user) {
        this.client = new APIClient(`${ENV_PARAMS.BASE_URL}/api/v1/${user.defaultProject}/widget`, {
            'Content-Type': 'application/json',
            'Authorization': `bearer ${user.token}`
        })
    }

    async create(request) {
        try {
            const response = await this.client.post("", request);
            logger.info(`Created a new widget (id: ${response.data.id})`);
            return response.data.id;
        } catch (e) {
            throw new Error(`Couldn't create a widget: ${e.response.data.message}`)
        }
    }
}

module.exports = Widget;
