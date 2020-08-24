

const Mongoose = require('mongoose');
const { boolean } = require('@hapi/joi');
let Schema = Mongoose.Schema;

let schemaObject = new Schema({
    users: [{
        userId: { type: Schema.Types.ObjectId, ref: 'users' },
        lastReadAt: { type: Date },
    }],
    conversationName: { type: String },
    lastMessage: {
        text: { type: String },
        createdAt: { type: Date }
    },
    isGroup: { type: Boolean, default: false }
});
schemaObject.set('timestamps', true);

module.exports = Mongoose.model('conversation', schemaObject);