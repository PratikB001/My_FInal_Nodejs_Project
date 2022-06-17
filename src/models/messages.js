const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    message: {
        type:String,
        required: true
    },
    senderID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    receiverID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    }
},{
    timestamps: true
});

const messages = mongoose.model('Messages', messageSchema);
module.exports = messages;