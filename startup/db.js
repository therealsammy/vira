const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config')


module.exports = function() {
    /* The code `module.exports = function() { ... }` is exporting a function as a module. This function is
    responsible for connecting to a MongoDB database using the `mongoose` library. */
    const db = config.get('db')
    mongoose.connect(db)
        .then(() => winston.info(`Connected to ${db}...`))
}