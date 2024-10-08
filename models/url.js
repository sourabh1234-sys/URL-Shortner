const mongoose = require('mongoose');

const urlschema = new mongoose.Schema({
    shortid: {
        type: String,
        required : true,
        unique: true,
    },
    newshorturl: {
        type: String,
        required : true,
    },
    vistihistory: [{timestamp: {type:Number}}],
    createby: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "users",
    }
    
} , {timestamps: true})

const URL = mongoose.model('url' , urlschema)

module.exports = URL;