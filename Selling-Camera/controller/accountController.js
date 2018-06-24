var express = require('express');
var userRepo = require('../repository/accountRepo');
var router = express.Router();

router.get('/', (req, res) => {
    accountRepo.loadAll().then(rows => {
        var vm = {
            users: c
        };
        res.render('profile/index', vm);
    });
});
router.post('/', (req, res) => {
    accountRepo.update(req.body).then(value => {
        res.redirect('/profile');
    });
});
module.exports = router;