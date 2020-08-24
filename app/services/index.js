
const CONFIG = require('../../config');
/********************************
 **** Managing all the services ***
 ********* independently ********
 ********************************/
module.exports = {
    swaggerService: require(`./${CONFIG.PLATFORM}/swaggerService`),
    authService: require(`./${CONFIG.PLATFORM}/authService`),
    conversationService:require(`./${CONFIG.PLATFORM}/conversationService`)
};