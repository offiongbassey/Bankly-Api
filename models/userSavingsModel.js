const Sequelize = require("sequelize");
const db = require("../config/database");

const User_Savings = db.define("user_savings", {
    userId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    agentId: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    amount: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    interest: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    interval: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    day_or_month: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    reference: {
        type: Sequelize.STRING,
    }
});

module.exports = User_Savings;