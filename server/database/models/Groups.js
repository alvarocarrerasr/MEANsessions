const { database } = require('./../Sequelize');
const { User } = require('./User');
const { GroupMembers } = require('./GroupMembers');
const Sequelize = require('sequelize');

var Group = database.define('Group',{
    id:{
        type:Sequelize.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    groupName:{
        type:Sequelize.STRING,
        require:true
    }
},{createdAt:false,updatedAt:false});


module.exports={
    Group
};