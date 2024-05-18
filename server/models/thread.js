const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Thread = sequelize.define('thread', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    message: Sequelize.TEXT,
    isLink: {
        type: Sequelize.BOOLEAN,
        default: false
    },
    isImg: {
        type: Sequelize.BOOLEAN,
        default: false
    }
});

module.exports = Thread;