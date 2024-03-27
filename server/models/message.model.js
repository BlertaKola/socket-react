const mongoose = require('mongoose');
const MessageSchema = new mongoose.Schema({
    text: { type: String,
    required: [
        true,
        "Message text is required"
    ], unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    chat : {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    }
}, { timestamps: true });
module.exports = mongoose.model('Message', MessageSchema);