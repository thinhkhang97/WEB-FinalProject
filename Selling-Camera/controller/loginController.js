var express = require('express');
var router = express.Router();
var SHA256 = require('crypto-js/sha256');
var db=require('../fn/db');

router.get('/',(req,res)=>{
    res.render('login/index');
});
router.post('/', (req, res) => {
    var user = {
        username: req.body.username,
        password: SHA256(req.body.password).toString()
    };

    console.log(user.username);
    console.log(user.password);

    var sql = `select * from users where username = '${user.username}' and passwords = '${user.password}'`;
    db.load(sql).then(rows=>{
        console.log(rows.length);
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.user = rows[0];
            req.session.cart = [];
            var vm={
                login:true
            }
    
            var url = 'home';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            res.render(url, vm);
        } else {
                res.render('login/index');
        }
    });

    

    
});
module.exports = router;