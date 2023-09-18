const config = require('config');

module.exports = function() {
    /* The code is checking if the `jwtPrivateKey` configuration value is defined. If it is not defined,
    it throws a new `Error` with the message 'FATAL ERROR: jwtPrivateKey is not defined.'. This is
    used to ensure that the application has a valid private key for JWT (JSON Web Tokens)
    authentication. */
    
    if(!config.get('jwtPrivateKey')){
        throw new Error('FATAL ERROR: jwtPrivateKey is not defined.');
    }
}