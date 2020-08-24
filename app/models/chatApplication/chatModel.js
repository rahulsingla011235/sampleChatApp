

const Mongoose = require('mongoose');
let Schema = Mongoose.Schema;

let schemaObject = new Schema({
    conversationId: { type: Schema.Types.ObjectId, ref: 'conversations' },
    fromId: { type: Schema.Types.ObjectId, ref: 'users' },
    msg: { type: String },
    readBy: [{ type: Schema.Types.ObjectId, ref: 'users' }]
});
schemaObject.set('timestamps', true);

module.exports = Mongoose.model('chat', schemaObject);