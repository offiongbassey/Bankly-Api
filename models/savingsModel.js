const Sequelize = require("sequelize");
const db = require("../config/database");

const Savings = db.define("savings", {
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    balance: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    start_date: {
        type: 'TIMESTAMP',
        allowNull: false,
    },
    end_date: {
        type: 'TIMESTAMP',
        allowNull: false
    },
    method: {
        type: Sequelize.STRING,
        allowNull: false
    }, 
    interval: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    accountNo: {
        type: Sequelize.BIGINT,
        allowNull: false
    }
});

module.exports = Savings;