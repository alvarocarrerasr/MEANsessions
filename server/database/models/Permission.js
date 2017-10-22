const {database} = require('./../Sequelize');
const Sequelize = require('sequelize') ;

const Permission = database.define('Permission',{
    permissionName:{
        type:Sequelize.STRING,
        primaryKey:true
    }
},{createdAt:false,updatedAt:false});

module.exports={
    Permission
}