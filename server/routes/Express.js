const express = require('express');
var { sequelize } = require('./../database/Sequelize');
var session = require('express-session');
var SequelizeStore = require('connect-session-sequelize')(session.Store);
const bodyparser = require('body-parser');


var app = express();
var sessionStore = new SequelizeStore({ db: sequelize });

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

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

