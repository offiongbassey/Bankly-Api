const Sequelize = require("sequelize");
const db = require("../config/database");

const Transaction = db.define("transaction", {
    amount: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    reference: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    },
    method: {
        type: Sequelize.STRING,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    status: {
        type: Sequelize.STRING,
        allowNull: false
    }

});

module.exports = Transaction;