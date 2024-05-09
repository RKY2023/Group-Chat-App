const Sequelize = require('sequelize');

const sequelize = require('../util/database');

const Membership = sequelize.define('membership', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    member: Sequelize.INTEGER,
    isAdmin: Sequelize.BOOLEAN
});

module.exports = Membership;