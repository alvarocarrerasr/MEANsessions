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

const User = database.define('User',{
    id: {
        type:Sequelize.INTEGER,
        autoIncrement:true,
        primaryKey:true
    },
    username: {
        type:Sequelize.STRING,
        unique:true,
        allowNull:false
    },
    password:{
        type:Sequelize.STRING
    }
    },{createdAt:false,updatedAt:false}
);















database.authenticate()
.then(()=>{
    console.log("Connected to database successfully");
})
.catch((err)=>{
    console.log("Error while connecting to DB", err);
})



module.exports ={
    sequelize:database,
    User
};