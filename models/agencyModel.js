const Sequelize = require("sequelize");
const db = require("../config/database");

const Agency = db.define('agency', {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    url: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    goal: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Agency;