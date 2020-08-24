"use strict";
/************* Modules ***********/
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;
const { LOGIN_TYPES } = require(`../../utils/constants`);
/**************************************************
 ************* Session Model or Collection ***********
 **************************************************/
const sessionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'user' },
    deviceId: { type: String },
    deviceToken: { type: String },
    token: { type: String },
    loginType: { type: Number, enum: [LOGIN_TYPES.NORMAL, LOGIN_TYPES.GOOGLE_PLAY, LOGIN_TYPES.GAME_CENTER] }
});

sessionSchema.set('timestamps', true);

module.exports = MONGOOSE.model('session', sessionSchema);
