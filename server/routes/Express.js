const express = require('express');
var { sequelize } = require('./../database/Sequelize');
const bodyparser = require('body-parser');


var app = express();

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));




app.use(function(req, resp, next){
    resp.header("Access-Control-Allow-Origin", "http://localhost:4200");
    resp.header("Access-Control-Allow-Credentials", "true");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, token");
    resp.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
    resp.removeHeader("X-Powered-By");
    next();
});



module.exports={
    app
}

