const Sequelize = require('sequelize');
const db = require("../config/database");
    const Token = db.define("token", {
        token: {
            type: Sequelize.STRING
        },
        type: {
            type: Sequelize.STRING
        }
    });

    module.exports = Token;