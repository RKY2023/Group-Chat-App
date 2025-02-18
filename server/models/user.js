const mongoose = require('mongoose');

const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/;

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: String,
    phoneno: {
        type: String,
        required: true,
        validate: {
            validator: function(v) {
                return phoneValidationRegex.test(v);
            },
        }
    },
    isLoggedIn: {
        type: Boolean,
        default: false,
    }
});

module.exports = mongoose.model('User', userSchema);