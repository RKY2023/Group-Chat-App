const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Thread = sequelize.define('Thread', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: Sequelize.TEXT,
});

module.exports = Thread;