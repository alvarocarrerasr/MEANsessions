const {app} = require('./routes/Express');
const {sequelize, User} = require('./database/Sequelize');


const PORT = process.env.PORT || 3789;





app.post('/login',(req, resp)=>{
    var username = req.body.usernameLogin;
    var password = req.body.passwordLogin;
    User.findOne({where:{username}})
    .then((user)=>{
        if(!user){
            throw new Error("User not found");
        }
        resp.send({user});
    })
    .catch((err)=>{
        resp.sendStatus(403);
    });
});

app.listen(PORT, ()=>{
    console.log(`Process listening on port ${PORT}`);
});

