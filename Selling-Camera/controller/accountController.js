var express = require('express');
var accountRepo = require('../repository/accountRepo');
var router = express.Router();
var SHA256 = require('crypto-js/sha256');
var moment = require('moment');

router.get('/', (req, res) => {
    res.redirect('account/profile');
});

router.get('/profile', (req, res) => {
    console.log(req.session.user);
    accountRepo.loadAccount(req.session.user.ID).then(rows => {
        console.log(rows[0]);
        var vm = {
            userdetail: rows[0],
            layout: 'profileLayout.handlebars',

            //user: req.session.user
        };

        vm.userdetail.ngaysinh = moment(vm.userdetail.ngaysinh).format('YYYY-MM-DD');
        res.render('profile/index', vm);
    }).catch(err => {
        res.redirect('login/index');
    });
});
router.post('/profile', (req, res) => {
    var dob = moment(req.body.dob).format('YYYY-MM-DDTHH:mm');

    if (req.body.new_password != '') {
        var user = {
            ID: req.session.user.ID,
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
            ID: req.session.user.ID,
            passwords: req.session.user.passwords,
            hoten: req.body.name,
            gioitinh: req.body.gender,
            ngaysinh: dob,
            dthoai: req.body.phone_number,
            diachi: req.body.address,
            //permission: 0
        };
    }
    accountRepo.update(user).then(value => {
        res.redirect(req.headers.referer);
    });
});

router.get('/order', (req, res) => {
    var p1 = accountRepo.loadOrder(req.session.user.id);

    Promise.all([p1]).then(([pRows]) => {
        var vm = {
            orders: pRows,
            layout: 'profileLayout.handlebars',
            //user: req.session.user
        };

        for (var i = 0; i < pRows.length; i++) {
            vm.orders[i].OrderDate = moment(vm.orders.OrderDate).format('YYYY-MM-DD');
        }
        console.log(vm.orders);
        res.render('profile/order', vm);
    });
});
router.post('/order', (req, res) => {
    accountRepo.loadOrder(req.session.user.id).then(rows => {
        var vm = {
            orders: rows,
            layout: 'profileLayout.handlebars',
            //user: req.session.user
        };
        console.log(vm.order);
        for (var i = 0; i < vm.order.length; i++) {
            vm.order.OrderDate = moment(vm.userdetail.ngaysinh).format('YYYY-MM-DD');
        }
        res.render('profile/orderview', vm);
    });
});
module.exports = router;