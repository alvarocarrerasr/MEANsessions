const { database } = require('./../Sequelize');
const Sequelize = require('sequelize');

var User = database.define('User', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING
    }
}, { createdAt: false, updatedAt: false }
);
User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

module.exports = {
    User
}