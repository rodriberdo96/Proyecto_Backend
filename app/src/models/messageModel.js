const mongoose = require('mongoose') 

const MessageModel = mongoose.model('Messages', new mongoose.Schema({
    email: {type: String, required: true},
    timestamp: {type: Date, default: Date.now, required: true},
    message: {type: String, required: false}
}))

module.exports = { MessageModel }