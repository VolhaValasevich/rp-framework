"use strict"
const jira = require('../../api/utils/JiraService');

class JiraReporter {

    findJiraTag(specName) {
        const match = specName.match(/@jira\((.*)\)/);
        if (match && match.length > 0) return match[1];
    }

    startProgress(spec) {
        const issueId = this.findJiraTag(spec.description);
        if (issueId) return jira.updateIssueStatus(issueId, "In Progress")
    }

    pass(spec) {
        const issueId = this.findJiraTag(spec.description);
        if (issueId) return jira.updateIssueStatus(issueId, "Passed")
    }

    async fail(spec) {
        const issueId = this.findJiraTag(spec.description);
        if (issueId) {
            let errorMessage = 'Test failed:';
            for (let i = 0; i < spec.failedExpectations.length; i++) {
                errorMessage += `\n${spec.failedExpectations[i].message}`
            }
            await jira.updateIssueStatus(issueId, "Failed");
            return jira.addCommentToIssue(issueId, errorMessage);
        }
    }
}

module.exports = new JiraReporter();
