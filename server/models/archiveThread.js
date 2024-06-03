const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const ArchiveThread = sequelize.define('archiveThread', {
    id: {
        type: Sequelize.INTEGER,
        // autoIncrement: true,
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
    },
    img: {
        type: Sequelize.TEXT
    }
});

module.exports = ArchiveThread;