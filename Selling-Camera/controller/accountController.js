var express = require('express');
var accountRepo = require('../repository/accountRepo');
var router = express.Router();

router.get('/', (req, res) => {
    res.redirect('account/profile');
});

router.get('/profile', (req, res) => {
    console.log(req.session.users);
    accountRepo.loadAccount(req.session.users.id).then(rows => {
        var vm = {
            userdetail: rows[0],
            //user: req.session.user
        };
        res.render('profile/index', vm);
    });
});
router.post('/profile', (req, res) => {
    accountRepo.update(req.body).then(value => {
        res.redirect('/profile');
    });
});
module.exports = router;