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
            fullname: req.body.fullname,
            phone:req.body.phone,
            address:req.body.address,
            username: req.body.username,
            password: SHA256(req.body.password).toString(),
            email: req.body.email
        };

        var sql = `insert into users(hoten,dthoai,diachi,username, passwords, email) values('${user.fullname}','${user.phone}','${user.address}','${user.username}', '${user.password}', '${user.email}')`;
    db.save(sql).then(row=>{
        res.render('register/index',{
            login_ok:true
        });
    }).catch(err=>{
        res.render('register/index',{
            login_false:true
        });
    });
}   
});
module.exports = router;