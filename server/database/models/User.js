const { database } = require('./../Sequelize');
const { Group } = require('./Groups');
const { GroupMembers } = require('./GroupMembers');
const { Session } = require('./Session');
const _ = require('lodash/collection');
const Sequelize = require('sequelize');
const crypto = require('crypto');

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

User.belongsToMany(Group, {
    through: {
        model: GroupMembers,
        unique: false,
        as: 'groups'
    }
});

User.hasMany(Session,{foreignKey:'userId', targetKey:'id'});


User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

User.prototype.getGroups = function () {
    var response = [];
    return new Promise((success, err) => {
        User.findOne({ where: { id: this.id }, include: [{ model: Group }] })
            .then((user) => {
                _.forEach(user.Groups, (group) => {
                    response.push(group.groupName);
                });
                success(response);
            })
            .catch((err) => {
                err(err);
            })
    });
}


User.prototype.generateSessionForUser = function(callback){
    var currentDate = new Date().getTime();

    var uniqueId = crypto.createHash('md5')
        .update(currentDate.toString())
        .update(this.id.toString())
        .digest('base64');

    console.log('ses', Session);
    var newSession = Session.create({
        sid: uniqueId,
        userId: this.id
    }).then((success) => {
        callback(null,uniqueId);
    }).catch((err) => {
        callback(err);
    });
};

module.exports = {
    User
}

