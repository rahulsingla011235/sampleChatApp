'use strict';
const CONFIG = require('../../config');
/********************************
 **** Managing all the models ***
 ********* independently ********
 ********************************/
module.exports = {
    userModel: require(`../models/${CONFIG.PLATFORM}/userModel`),
    chatModel: require(`../models/${CONFIG.PLATFORM}/chatModel`),
    conversationModel: require(`../models/${CONFIG.PLATFORM}/conversationModel`),
    sessionModel: require(`../models/${CONFIG.PLATFORM}/sessionModel`)
};