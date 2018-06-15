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
        password: SHA256(req.body.rawPWD).toString()
    };

    var sql = `select * from users where username = '${user.username}' and passwords = '${user.password}'`;
    var rows = db.load(sql);

    if (rows.length > 0) {
        req.session.isLogged = true;
        req.session.user = rows[0];
        req.session.cart = [];

        var url = '/';
        if (req.query.retUrl) {
            url = req.query.retUrl;
        }
        res.redirect(url);

    } else {
        var vm = {
            showError: true,
            errorMsg: 'Login failed'
        };
        res.render('home/index', {
            login: false
        });
    }
});
module.exports = router;