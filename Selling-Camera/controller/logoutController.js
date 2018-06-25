var express = require('express');
var router = express.Router();
var db = require('../fn/db');

router.get('/', (req, res) => {
    var sql = `delete from sessions`;
    db.save(sql).then(row => {
        req.session.isLogged = false;
        req.session.user = null;
        req.session.cart = [];
        console.log('[SUCCESS] Delete session - logged out');
        console.log('[NOTIFY] Redirect to home');
        res.redirect('/');
    });
});
module.exports = router;