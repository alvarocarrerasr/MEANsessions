const {sequelize} = require('./../../database/Sequelize');
const models = require('./../../database/Models');
const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 10;
var router = require('express').Router();

router.post('/login',(req, resp, next)=>{
    var username = req.body.usernameLogin;
    var password = req.body.passwordLogin;
  
    models.User.findOne({where:{username}})
    .then((user)=>{
        if(!user) throw new Error("User not found");
        return user;
    }).then((user)=>{
        result = bcrypt.compareSync(password, user.password);
        if(!result) throw new Error("Incorrect password");
        return user;
    }).then((user)=>{
        (new models.Session()).generateSessionForUser(user.id,(err,sid)=>{
            if(!err){
                resp.send({token:sid});
                return;
            }
            throw new Error(err);
            next();
        });
    }).catch((err)=>{
        resp.status(403).send({error:err.toString()});
    })
});

router.get('/login',(req, resp, next)=>{
    var token = req.headers.token;
    models.Session.findOne({where:{sid:token},include:[{model:models.User}]})
    .then((session)=>{return session.User})
    .then((user)=>{
        if(!user) throw new Error("User not authenticated");
        resp.send(user.toJSON());
        next();
    })
    .catch((err)=>resp.status(403).send({error:err.toString()}))
});

router.get('/logout',(req,resp, next)=>{
    var token = req.headers.token;
    models.Session.destroy({where:{sid:token}})
    .then(()=>{})
    .catch(()=>{})
    .finally(()=>{resp.status(403).send({"status":"logged out"}); next()});
})

module.exports={
    login:router
}