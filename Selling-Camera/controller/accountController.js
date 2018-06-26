var express = require('express');
var accountRepo = require('../repository/accountRepo');
var router = express.Router();
var SHA256 = require('crypto-js/sha256');
var moment = require('moment');

router.get('/', (req, res) => {
    res.redirect('account/profile');
});

router.get('/profile', (req, res) => {
    console.log(req.session.users);
    accountRepo.loadAccount(req.session.users.id).then(rows => {
        var vm = {
            userdetail: rows[0],
            layout: 'profileLayout.handlebars',

            //user: req.session.user
        };
        console.log(vm.userdetail);

        vm.userdetail.ngaysinh = moment(vm.userdetail.ngaysinh).format('YYYY-MM-DD');
        res.render('profile/index', vm);
    });
});
router.post('/profile', (req, res) => {
    var dob = moment(req.body.dob).format('YYYY-MM-DDTHH:mm');

    console.log(req.body.dob);
    console.log(dob);
    console.log(req.body);
    if (req.body.new_password != '') {
        var user = {
            ID: req.session.users.id,
            passwords: SHA256(req.body.new_password).toString(),
            hoten: req.body.name,
            gioitinh: req.body.gender,
            ngaysinh: dob,
            dthoai: req.body.phone_number,
            diachi: req.body.address,
            //permission: 0
        };
    } else {
        var user = {
            ID: req.session.users.id,
            passwords: req.session.users.passwords,
            hoten: req.body.name,
            gioitinh: req.body.gender,
            ngaysinh: dob,
            dthoai: req.body.phone_number,
            diachi: req.body.address,
            //permission: 0
        };
    }
    console.log(user);
    console.log(req.headers.referer);
    accountRepo.update(user).then(value => {
        res.redirect(req.headers.referer);
    });
});
module.exports = router;