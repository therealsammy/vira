require('express-async-errors');
const winston = require('winston');
require('winston-mongodb');

/**
 * Configures logging mechanisms for the application using Winston.
 * 
 * This module sets up:
 * - Console logging with specific formatting
 * - File logging for uncaught exceptions
 * - General file logging
 * - MongoDB logging, if the environment is not 'test'
 * 
 * The module also sets up a listener for unhandled promise rejections 
 * to throw them, so that they can be caught by Winston's exception handler.
 */

module.exports = function() {

    // Set up console transport with combined formatting of simple text, pretty print, and color.
    winston.add(new winston.transports.Console({
        format: winston.format.combine(
            winston.format.simple(),
            winston.format.prettyPrint(),
            winston.format.colorize()
        ),
        handleExceptions: true // Handle uncaught exceptions
    }));    

    // Set up file transport for logging uncaught exceptions.
    winston.add(new winston.transports.File({
        filename: 'uncaughtException.log',
        handleExceptions: true
    }));

    // Listen for any unhandled promise rejections and throw them.
    process.on('unhandledRejection', (ex) => {
        throw ex;
    });
    
    // Set up general file logging transport.
    winston.add(new winston.transports.File({ filename: 'logfile.log' }));
    
    // If the environment is not for testing, set up MongoDB transport for logging.
    if (process.env.NODE_ENV !== 'test') {
        winston.add(new winston.transports.MongoDB({
            db: 'mongodb://127.0.0.1/vidly',
            options: {
                useUnifiedTopology: true
            },
            level: 'error' // Log only error level and above to MongoDB
        }));
    }
}
