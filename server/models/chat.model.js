const mongoose = require('mongoose');
const ChatSchema = new mongoose.Schema({
    name: { type: String,
    required: [
        true,
        "Chat name is required"
    ], unique: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }]
}, { timestamps: true });
module.exports = mongoose.model('Chat', ChatSchema);