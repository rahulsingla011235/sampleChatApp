"use strict";
/************* Modules ***********/
const MONGOOSE = require('mongoose');
const Schema = MONGOOSE.Schema;
/**************************************************
 ************* User Model or collection ***********
 **************************************************/
const userSchema = new Schema({
    name: { type: String },
    email: { type: String },
    profileUrl: { type: String },
    password: { type: String }
});

userSchema.set('timestamps', true);

module.exports = MONGOOSE.model('user', userSchema);



