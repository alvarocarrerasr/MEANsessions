const settings = require('./../settings.json');
const Sequelize = require('sequelize') ;


const DATABASE_SETTINGS = settings.database;
var database = new Sequelize(
    DATABASE_SETTINGS.dbName,
    DATABASE_SETTINGS.dbUsername, 
    DATABASE_SETTINGS.dbPassword,
    {
        host:DATABASE_SETTINGS.dbHost,
        dialect:DATABASE_SETTINGS.dbType,
        pool:{
            max:5,
            min:0,
            idle:10000
        }
    }
);

database.authenticate()
.then(()=>{
    console.log("Connected to database successfully");
})
.catch((err)=>{
    console.log("Error while connecting to DB", err);
})



module.exports ={
    sequelize:database
};