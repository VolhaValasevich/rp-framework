const winston = require('winston');

const logger = winston.createLogger({
    level: 'info',
    transports: [
        new winston.transports.Console({
            format: winston.format.simple(),
        }),
        new winston.transports.File({
            filename: 'combined.log',
            format: winston.format.simple(),
        }),
    ],
});

module.exports = logger;
