'use strict';
const { conversationModel } = require(`../../models`);
const { PAGINATION } = require('../../utils/constants');

let conversationService = {};

//Function to get conversations of user.
conversationService.getConversation = async (payload) => {
    let limit = payload.limit || PAGINATION.DEFAULT_LIMIT;
    let skip = payload.skip || PAGINATION.DEFAULT_NUMBER_OF_DOCUMENTS_TO_SKIP;
    let query = [
        //Find the conversation in which user is exists.
        { $match: { 'users.userId': userId } },
        //Unwind the users of each conversation.
        {
            $unwind: "$users"
        },
        //find the info of user from user collection.
        {
            $lookup: {
                from: "users",
                localField: "users.userId",
                foreignField: "_id",
                as: "userInfo"
            }
        },
        //Group then again and push each user info in the users array.
        {
            $group: {
                _id: "$_id",
                conversationName: {
                    $first: "$conversationName",
                },
                lastMessage: {
                    $first: "$lastMessage",
                },
                isGroup: {
                    $first: "$isGroup",
                },
                users: {
                    $push: {
                        userId: "$users.userId",
                        userName: "$userInfo.name",
                        profileUrl: '$userInfo.profileUrl',
                        lastReadAt: '$users.lastReadAt'
                    }
                }
            }
        },
        //Find the unread messages of user.
        {
            $lookup: {
                from: "chats",
                let: { "user_id": userId, "conversation_id": '$_id' },
                pipeline: [
                    { $match: { $expr: { $and: [{ $eq: ["$conversationId", "$$conversation_id"] }, { $and: [{ $nin: ['$readBy', '$$user_id'] }, { $ne: ['$fromId', '$$userId'] }] }] } } },
                    { $project: { _id: 1 } }
                ],
                as: "unreadMessages"
            }
        },
        //Find other user info if isGroup false otherwise is null.
        {
            $addFields: {
                otherUserInfo: {
                    $cond: [{ $eq: ['$isGroup', true] }, null, {
                        $filter: {
                            input: '$users',
                            as: 'user',
                            cond: { $ne: ['$$user.userId', userId] }
                        }
                    }]
                }
            }
        },
        { $unwind: { path: '$otherUserInfo', "preserveNullAndEmptyArrays": true } },
        {
            $addFields: {
                unreadMessages: { $size: '$unreadMessages' },
                conversationName: { $cond: [{ $eq: ['$isGroup', true] }, '$conversationName', '$otherUserInfo.userName'] }
            }
        },
        {
            $project: {
                otherUserInfo: 0
            }
        },
        {
            $skip: skip
        },
        {
            $limit: limit
        }
    ];
    return await conversationModel.aggregate(query);
};

module.exports = conversationService;