const { app } = require('./routes/Express');
const { login } = require('./routes/routes/Login');
const { database } = require('./database/Sequelize');

const PORT = process.env.PORT || 3789;


database.sync();

app.use('/',login);




app.listen(PORT, ()=>{
    console.log(`Process listening on port ${PORT}`);
});

