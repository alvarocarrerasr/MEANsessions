const express = require('express');
var { sequelize } = require('./../database/Sequelize');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);



var app = express();

app.use(session(
    {
        secret: "a real secret",
        resave: false,
        saveUninitialized: true,
        cookie: {
            expires: 36000000
        },
        store: new SequelizeStore({ db: sequelize })
    }
));



module.exports={
    app
}

