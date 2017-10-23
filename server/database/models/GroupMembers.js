const { database } = require('./../Sequelize');
const { User } = require('./User');
const { Group } = require('./Groups');
const Sequelize = require('sequelize');

var GroupMembers = database.define('GroupMember',{
    
},{createdAt:false,updatedAt:false});


module.exports={
    GroupMembers
};