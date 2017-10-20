const express = require('express');
var { sequelize } = require('./../database/Sequelize');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const bodyparser = require('body-parser');


var app = express();
var sessionStore = new SequelizeStore({ db: sequelize });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));




app.use(function(req, resp, next){
    resp.header("Access-Control-Allow-Origin", "http://localhost:4200");
    resp.header("Access-Control-Allow-Credentials", "true");
    resp.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    resp.header("Access-Control-Allow-Methods", "POST,GET,OPTIONS,PUT,DELETE");
    resp.removeHeader("X-Powered-By");
    next();
});


app.use(session(
    {
        secret: "a real secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: 36000000
        },
        store: sessionStore
    }
));

sessionStore.sync();



module.exports={
    app
}

