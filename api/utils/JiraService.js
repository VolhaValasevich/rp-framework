"use strict"
const APIClient = require("./client");
const logger = require('../../e2e/utils/Logger');
const {config} = require('../../config/conf');

class JiraService {
    constructor() {
        this.client = new APIClient(config.jiraOptions.url, {
            Authorization: `Bearer ${config.jiraOptions.token}`
        })
    }

    async getIssueStatusId(issueId, status) {
        try {
            const response = await this.client.get(`/issue/${issueId}/transitions?expand=transitions.fields`);
            return response.data.transitions.find(transition => transition.name === status).id;
        } catch (e) {
            throw new Error(`Couldn't get [${status}] status id: ${e.message}`)
        }
    }

    async updateIssueStatus(issueId, status) {
        try {
            const statusId = await this.getIssueStatusId(issueId, status);
            const body = {
                transition: {
                    id: statusId
                }
            }
            await this.client.post(`/issue/${issueId}/transitions`, body);
            logger.info(`Updated status of [${issueId}]: [${status}]`);
        } catch (e) {
            throw new Error(`Couldn't update [${status}] status id for [${issueId}]: ${e.message}`)
        }
    }

    async addCommentToIssue(issueId, text) {
        const body = {
            body: text
        }
        try {
            await this.client.post(`/issue/${issueId}/comment`, body);
            logger.info(`Added comment to [${issueId}]`);
        } catch (e) {
            throw new Error(`Couldn't add comment to [${issueId}]: ${e.message}`)
        }
    }
}

module.exports = new JiraService();
