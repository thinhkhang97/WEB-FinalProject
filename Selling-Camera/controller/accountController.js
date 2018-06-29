var express = require('express');
var accountRepo = require('../repository/accountRepo');
var router = express.Router();
var SHA256 = require('crypto-js/sha256');
var getF = require('../fn/getFolder');
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
    });
});
router.post('/profile', (req, res) => {
    var dob = moment(req.body.dob).format('YYYY-MM-DDTHH:mm');

    console.log(req.body.dob);
    console.log(dob);
    console.log(req.body);
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
    console.log(user);
    console.log(req.headers.referer);
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
        res.render('profile/order', vm);
    });
});

router.get('/orderdetail', (req, res) => {
    p1 = accountRepo.loadOrderUsers(req.query.id);
    p2 = accountRepo.loadOrderDetail(req.query.id);
    var total=0;
    var f=[];
    Promise.all([p1,p2]).then(([pO, pOD]) => {
        for(var i = 0; i <pOD.length; i++){
            var fd = getF.getCatgoryById(pOD[i].proCatID);
            total += pOD[i].Amount * 1;
            var item={
                pro: pOD[i],
                fd: fd,
            }
            f.push(item);
        }
        var vm = {
            orders: pO[0],
            details: f,
            total: total,
            layout: 'profileLayout.handlebars',
            //user: req.session.user
        };

        vm.orders.OrderDate = moment(vm.orders.OrderDate).format('YYYY-MM-DD');
        res.render('profile/orderdetail', vm);
    });
});
module.exports = router;