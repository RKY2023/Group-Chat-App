const mongoose = require('mongoose');

const usergroupSchema = new mongoose.Schema({
    isAdmin: {
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

module.exports = mongoose.model('Usergroup', usergroupSchema);