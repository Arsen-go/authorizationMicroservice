require('dotenv').config();
const DB = require('mongoose');
const { logger } = require('../logger');

const connectionPath = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

DB.connection.on('connected', () => {
    logger.info('mongodb connected');
    console.log(`Database ${DB.connection.name} is Connected with port ${DB.connection.port}`);
});

DB.connection.on('error', (err) => {
    logger.info(`Failed to connect to DB ${connectionPath} on startup `, err);
});

DB.connection.on('disconnected', () => {
    logger.info(`Mongoose default connection to DB :${connectionPath} disconnected`);
});

const gracefulExit = () => {
    DB.connection.close(() => {
        logger.info(`Mongoose default connection with DB :${connectionPath} is disconnected through app termination`);
        process.exit(0);
    });
};

// If the Node process ends, close the Mongoose connection
process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit);

DB.connect(connectionPath,
    { user: process.env.DB_USERNAME, pass: process.env.DB_PASSWORD, useNewUrlParser: true });

module.exports = { DB };

