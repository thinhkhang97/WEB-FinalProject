var express = require('express');
var router = express.Router();
var SHA256 = require('crypto-js/sha256');
var db = require('../fn/db');

router.get('/',(req,res)=>{
    res.render('register/index');
});

router.post('/', (req, res) => {
    var confirmpassword=req.body.confirmpassword;
    var password=req.body.password;
    if(confirmpassword==password)
    {
        var user = {
            username: req.body.username,
            password: SHA256(req.body.password).toString(),
            email: req.body.email
        };

        var sql = `insert into users(username, passwords, email) values('${user.username}', '${user.password}', '${user.email}')`;
    db.save(sql);
    res.render('register/index',{
        register:false
    });
    }

    
});
module.exports = router;