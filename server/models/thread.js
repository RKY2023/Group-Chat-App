const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Thread = sequelize.define('Thread', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sender: Sequelize.INTEGER,
    receiver: Sequelize.INTEGER,
    message: Sequelize.TEXT
});

module.exports = Thread;