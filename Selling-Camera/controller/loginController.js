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
        if (rows.length > 0) {
            req.session.isLogged = true;
            req.session.user = rows[0];
            req.session.cart = [];
            var vm={
                login:true
            }
    
            var url = '/';
            if (req.query.retUrl) {
                url = req.query.retUrl;
            }
            console.log(rows[0].role);
            if(rows[0].role==='customer'){
                
                req.session.isAdmin = false;
                console.log('[SUCCESC] Loggin in customer side');
                console.log('[NOTIFY] Redirect to home');
                res.redirect(url);
            }
            else{
                req.session.isAdmin = true;
                console.log('[SUCCESC] Loggin in admin side');
                console.log('[NOTIFY] Reder in admin index');
                res.redirect('admin');
            }
        } else {
                res.render('login/index');
        }
    }).catch(errs=>{
        console.log('[ERROR] Cannot log in');
    });
});
module.exports = router;