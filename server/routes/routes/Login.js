const {database} = require('./../../database/Sequelize');
const models = require('./../../database/Models');
const bcrypt = require('bcrypt');

const BCRYPT_ROUNDS = 10;
var router = require('express').Router();

router.post('/login',(req, resp, next)=>{
    var username = req.body.usernameLogin;
    var password = req.body.passwordLogin;
    
    models.User.findOne({where:{username}})
    .then((user)=>{
        if(!user) throw new Error('User is not valid');
        return user;
    }).then((user)=>{
        result = bcrypt.compareSync(password, user.password);
        if(!result) throw new Error('Password is not correct');
        return user;
    }).then((user)=>{
        user.generateSessionForUser((err,sid)=>{
            if(err){
                throw new Error(err);   
            }
            resp.send({token:sid});
            next();
        });
    }).catch((err)=>{
        resp.status(403).send({error:err.toString()});
    })
});

router.get('/login',(req, resp, next)=>{
    var token = req.headers.token;
    database.query(`SELECT * FROM Users WHERE id = (SELECT userId FROM Sessions WHERE sid='${token}')`,
        {model:models.User, type:database.QueryTypes.SELECT})
    .then((users)=>{
        const user = users[0];
        if(!user) throw new Error('User not authenticated');
        var currentUser = user.toJSON();
        user.getGroups()
        .then((groups)=>{
            currentUser.groups = groups;
            resp.send(currentUser);
            next();
        }).catch(()=>new Error());
    })
    .catch((err)=>{
        resp.status(403).send({error:err.toString()});
    })
});

router.get('/logout',(req,resp, next)=>{
    var token = req.headers.token;
    models.Session.destroy({where:{sid:token}})
    .then(()=>{})
    .catch(()=>{})
    .finally(()=>{resp.send({"status":"logged out"}); next()});
})

module.exports={
    login:router
}