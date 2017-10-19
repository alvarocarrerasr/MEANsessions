const {app} = require('./routes/Express');
const {sequelize} = require('./database/Sequelize');


const PORT = process.env.PORT || 3789;





app.post('/login',(req, resp)=>{

});

app.listen(PORT, ()=>{
    console.log(`Process listening on port ${PORT}`);
});

