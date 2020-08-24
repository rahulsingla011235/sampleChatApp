const path = require('path');
const lodash = require('lodash');

var development = require('./env/development');
var production = require('./env/production');
var staging = require('./env/staging');


var PLATFORM = process.env.PLATFORM || 'chatApplication';
var mongoUri = 'mongodb://localhost:27017/chatApplication';



var defaults = {
    PLATFORM: PLATFORM,
    root: path.normalize(__dirname + '/../app'),
    theme: PLATFORM + '/us',
    mongoUri: mongoUri,
    environment: process.env.NODE_ENV || 'production',
    show: function () {
        console.log('environment: ' + this.environment);
    },
    ENV_STAGING: "staging",
    ENV_DEVELOPMENT: "development",
    ENV_PRODUCTION: "production",
    environment: process.env.NODE_ENV || 'development',
    mongoDB: {
        PROTOCOL: process.env.DB_PROTOCOL || 'mongodb',
        HOST: process.env.DB_HOST || '127.0.0.1',
        PORT: process.env.DB_PORT || 27017,
        NAME: PLATFORM || 'ChatApplication',
        USER: '',
        PASSWORD: '',
        get URL() { return process.env.dbUrl || `${this.PROTOCOL}://${this.HOST}:${this.PORT}/${this.NAME}` }
    },
    domain: {
        PROTOCOL: process.env.DOMAIN_PROTOCOL || 'http',
        HOST: process.env.DOMAIN_HOST || '127.0.0.1',
        PORT: process.env.DOMAIN_PORT ? process.env.DOMAIN_PORT : '3000',
        get URL() { return `${this.PROTOCOL}://${this.HOST}${!!this.PORT ? ':' + this.PORT : ''}` }
    },
    server: {
        PROTOCOL: process.env.SERVER_PROTOCOL || 'http',
        HOST: process.env.SERVER_HOST || '0.0.0.0',
        PORT: process.env.SERVER_PORT || '3001',
        get URL() { return `${this.PROTOCOL}://${this.HOST}:${this.PORT}` }
    },
    SERVER_URL: process.env.SERVER_URL || 'http://localhost:3000',
    swagger: require('./swagger'),
    SERVER_URL: process.env.SERVER_URL || 'http://localhost:3000',
};

let currentEnvironment = process.env.NODE_ENV || 'production';

function myConfig(myConfig) {
    let mergedConfig = lodash.extend(lodash.clone(defaults), myConfig);
    return mergedConfig;
};

module.exports = {
    development: myConfig(development),
    production: myConfig(production),
    staging: myConfig(staging)
}[currentEnvironment];


