const {app} = require('./routes/Express');
const {sequelize} = require('./database/Sequelize');


const PORT = process.env.PORT || 3789;





app.post('/login',(req, resp)=>{
    var username = req.body.usernameLogin;
    var password = req.body.passwordLogin;
    req.session.username=username;
    console.log(req);
    resp.destroy();
    console.log("Login from", username, password);
    console.log(req.session);

});

app.listen(PORT, ()=>{
    console.log(`Process listening on port ${PORT}`);
});

