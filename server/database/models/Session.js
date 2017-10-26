const { database } = require('./../Sequelize');
const Sequelize = require('sequelize');



const Session = database.define('Session', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    userId: Sequelize.INTEGER
}, { createdAt: false, updatedAt: false });



module.exports = {
    Session
}