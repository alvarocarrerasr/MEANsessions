const { database } = require('./../Sequelize');
const { Group } = require("./Groups");
const Sequelize = require('sequelize');

var GroupPermissions = database.define('GroupPermission',{
    permissionName:{
        type:Sequelize.STRING,
        require:true
    },
    groupId:{
        require:true,
        type:Sequelize.INTEGER
    }
},{createdAt:false,updatedAt:false});

GroupPermissions.belongsTo(Group,{foreignKey:'groupId', targetKey:'id'});

module.exports={
    GroupPermissions
};