const mongoose = require('mongoose');

const threadSchema = new mongoose.Schema({
    message: String,
    isLink: {
        type: Boolean,
        default: false
    },
    isImg: {
        type: Boolean,
        default: false
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    groupId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Group',
        required: true
    }
});

module.exports = mongoose.model('Thread', threadSchema);