const { database } = require('./../Sequelize');
const Sequelize = require('sequelize');
const { User } = require('./User');
const crypto = require('crypto');

const Session = database.define('Session', {
    sid: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    userId: Sequelize.INTEGER
}, { createdAt: false, updatedAt: false });
Session.belongsTo(User, { foreignKey: 'userId', targetKey: 'id' });

Session.prototype.generateSessionForUser = (userId, callback) => {
    var currentDate = new Date().getTime();

    var uniqueId = crypto.createHash('md5')
        .update(currentDate.toString()).
        update(userId.toString())
        .digest('base64');

    var newSession = Session.create({
        sid: uniqueId,
        userId: userId
    }).then((success) => {
        callback(null,uniqueId);
    })
    .catch((err) => {
        callback(err);
    });
}

module.exports = {
    Session
}