'use strict';

const { Joi } = require('../../../utils/joiUtils');
const CONFIG = require('../../../../config');
const { AVAILABLE_AUTHS } = require(`../../../utils/constants`);
//load controllers
const { getConversations} = require(`../../../controllers/${CONFIG.PLATFORM}/conversationController`);

let routes = [
	{
        method:'GET',
        path: '/v1/conversation',
		joiSchemaForSwagger: {
            headers: {
                'authorization': Joi.string().required().description('User\'s JWT token.')
            },
			query: {
                limit: Joi.number().optional().description('Number of documents to fetch.'),
                skip: Joi.number().optional().description('Number of documents to skip.'),
			},
			group: 'Conversation',
			description: 'Route to get conversation of a user.',
			model: 'Conversation'
		},
		auth: AVAILABLE_AUTHS.USER,
		handler: getConversations
    }
];

module.exports = routes;




