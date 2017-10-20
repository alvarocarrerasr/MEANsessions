const {app} = require('./routes/Express');
const {sequelize, User, Session} = require('./database/Sequelize');
const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 10;
const PORT = process.env.PORT || 3789;





app.post('/login',(req, resp)=>{
    var username = req.body.usernameLogin;
    var password = req.body.passwordLogin;
    var sessionId = req.sessionID;
  
    User.findOne({where:{username}})
    .then((user)=>{
        if(!user) throw new Error("User not found");
        return user;
    }).then((user)=>{
        result = bcrypt.compareSync(password, user.password);
        if(!result) throw new Error("Incorrect password");
        return {result, user};
    }).then(({result,user})=>{
        resp.send({user});
        return user;
    }).then((user)=>Session.update({userId:user.id},{where:{sid:sessionId}}).then(()=>{}).catch(()=>{}))
    .catch((err)=>{
        resp.status(403).send({error:err.toString()});
    })
});

app.get('/login',(req, resp)=>{
    var sessionId = req.sessionID;
    Session.findOne({where:{sid:sessionId},include:[{model:User}]})
    .then((session)=>{return session.User})
    .then((user)=>{
        if(!user) throw new Error("User not authenticated");
        resp.send({user})
    })
    .catch((err)=>resp.status(403).send({error:err.toString()}))
});

app.get('/logout',(req,resp)=>{
    req.session.destroy((err)=>{
        resp.send({user:loggedOut});
    });
});

app.listen(PORT, ()=>{
    console.log(`Process listening on port ${PORT}`);
});

