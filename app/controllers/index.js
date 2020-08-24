'use strict';
const CONFIG = require('../../config');
/********************************
 **** Managing all the controllers ***
 ********* independently ********
 ********************************/
module.exports = {
    conversationController: require(`./${CONFIG.PLATFORM}/conversationController`)
};