'use strict';
const yargs = require('yargs/yargs')
const {hideBin} = require('yargs/helpers')
const logger = require('./Logger');

class ParamsHelper {
    constructor() {
        this.argv = yargs(hideBin(process.argv))
            .alias({
                't': 'tags',
                'e': 'env'
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
            case 'epam': file = 'epam.json'; break;
            default: file = 'local.json'; break;
        }
        logger.info(`Using ${file} environment config.`);
        return file;
    }
}

module.exports = new ParamsHelper();
