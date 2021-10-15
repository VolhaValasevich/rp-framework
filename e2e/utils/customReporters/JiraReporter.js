"use strict"
const jira = require('../../../api/utils/JiraService');

class JiraReporter {

    findJiraTag(specName) {
        const match = specName.match(/@jira\((.*)\)/);
        if (match && match.length > 0) return match[1];
    }

    async markAsFailedWithComment(issueId, errors) {
        let errorMessage = 'Test failed:';
        for (let i = 0; i < errors.length; i++) {
            errorMessage += `\n${errors[i].message}`
        }
        await jira.updateIssueStatus(issueId, "Failed");
        return jira.addCommentToIssue(issueId, errorMessage);
    }

    specStarted(spec) {
        const issueId = this.findJiraTag(spec.description);
        if (issueId) return jira.updateIssueStatus(issueId, "In Progress")
    }

    specDone(spec) {
        const issueId = this.findJiraTag(spec.description);
        if (issueId) {
            if (spec.failedExpectations.length > 0) return this.markAsFailedWithComment(issueId, spec.failedExpectations);
            else return jira.updateIssueStatus(issueId, "Passed");
        }
    }

}

module.exports = new JiraReporter();
