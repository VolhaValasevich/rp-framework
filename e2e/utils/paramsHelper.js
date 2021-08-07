'use strict';
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const logger = require('./Logger');
const util = require("util");

class ParamsHelper {
    constructor() {
        this.argv = yargs(hideBin(process.argv))
            .alias({
                't': 'tags',
                'e': 'env',
                'b': 'browser',
                'i': 'instances'
            }).argv;
    }

    getTags() {
        const {tags} = this.argv;
        if (typeof tags === 'string') {
            const tagsArray = tags.split(',').map(tag => tag.trim());
            logger.info(`Executing tests with tags: ${tagsArray}`);
            return `(${tagsArray.join('|')})`;
        }
    }

    getEnvironment() {
        const {env} = this.argv;
        let file;
        switch (env) {
            case 'local': file = 'local.json'; break;
            case 'local-docker': file = 'local-docker.json'; break;
            case 'epam': file = 'epam.json'; break;
            default: file = 'local.json'; break;
        }
        logger.info(`Using ${file} environment config.`);
        return file;
    }

    getCapabilities() {
        const capabilities = {};
        capabilities.browserName = this.argv.browser || "chrome";
        capabilities.maxInstances = this.argv.instances || 1;
        capabilities.shardTestFiles = capabilities.maxInstances > 1;
        logger.info(`Browser started with capabilities: ${util.inspect(capabilities, false, null)}`);
        return capabilities;
    }
}

module.exports = new ParamsHelper();
