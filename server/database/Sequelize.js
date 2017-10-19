const settings = require('./../settings.json');
const Sequelize = require('sequelize') ;
const DATABASE_SETTINGS = settings.database;
var database = new Sequelize(
    DATABASE_SETTINGS.database,
    DATABASE_SETTINGS.username, 
    DATABASE_SETTINGS.password);



modle.exports ={
    sequelize:database
};