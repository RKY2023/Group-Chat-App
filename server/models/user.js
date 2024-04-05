const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const phoneValidationRegex = /\d{3}-\d{3}-\d{4}/ 

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: Sequelize.STRING,
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
    },
    password: Sequelize.STRING,
    phoneno: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            validator: function(v) {
                return phoneValidationRegex.test(v); 
            },
        }
    }
});

module.exports = User;