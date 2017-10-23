const { database } = require('./../Sequelize');
const { Group } = require('./Groups');
const { GroupMembers } = require('./GroupMembers');
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

User.belongsToMany(Group,{
    through:{
        model: GroupMembers,
        unique: false,
        scope:{
            taggable:'groups'
        },
        as:'groups'
    }
});


User.prototype.toJSON = function () {
    var values = Object.assign({}, this.get());
    delete values.password;
    return values;
}

User.prototype.getGroups = function (){
    User.findAll({where:{id:this.id},include:[{model:Group}]})
    .then((user)=>{
        console.log(user);
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports = {
    User
}

