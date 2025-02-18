const mongoose = require('mongoose');

const groupSchema = new mongoose.Schema({
    title: String,
    info: String,
});

module.exports = mongoose.model('Group', groupSchema);