module.exports = require('./template')({
    port: 3006,
    publicURL: 'http://localhost:3006',
    authEncryptSalt: 'dpomap',
    mongo: {
        host: 'localhost',
        port: 27017,
        database: 'dpomap'
    }
});
