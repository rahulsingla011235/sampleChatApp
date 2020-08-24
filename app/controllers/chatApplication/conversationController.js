"use strict";
const { MESSAGES} = require('../../utils/constants');
const SERVICES = require('../../services');
let conversationController = {};

//FUnction to get details of conversation of users.
conversationController.getConversations = async (payload) => {
    let convo = await SERVICES.conversationService.getConversation(payload);
    return Object.assign(HELPERS.responseHelper.createSuccessResponse(MESSAGES.CONVERSATIONS_FETCHED_SUCCUSSFULLY), { data: convo });
};

module.exports = conversationController;