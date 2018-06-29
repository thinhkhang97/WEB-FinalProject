var express = require('express');
var cartRepo = require('../repository/cartRepo');
var productRepo = require('../repository/productRepo');
var getF = require('../fn/getFolder');
var accountRepo = require('../repository/accountRepo');
var moment = require('moment');

var router = express.Router();
router.get('/', (req, res) => {
    var arr = [];
    console.log(req.session.cart)
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.loadProductByID(cartItem.proID);
        arr.push(p);
    }

    var items = [];
    var toTal = 0, ship = 0, toTal_ship = 0;
    Promise.all(arr).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            var fd = getF.getCatgoryById(pro.proCatID);
            var item = {
                Product: pro,
                fd: fd,
                Quantity: req.session.cart[i].proQuantity,
                Amount: pro.proPrice * req.session.cart[i].proQuantity
            };
            toTal += pro.proPrice * req.session.cart[i].proQuantity;
            items.push(item);
        }
        ship=50000;
        toTal_ship= toTal + ship;
        var vm = {
            items: items,
            total: toTal,
            ship: ship,
            total_ship: toTal_ship,
            layout: 'profileLayout.handlebars',
        };
        res.render('cart/index', vm);
    });
});

router.get('/pay', (req, res) => {

    var arr = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.loadProductByID(cartItem.proID);
        arr.push(p);
    }
    var user = accountRepo.loadAccount(req.session.user.id);
    arr.push(user);
    var items = [];
    var toTal = 0, ship = 0, toTal_ship = 0;
    Promise.all(arr).then(result => {
        for (var i = result.length - 2; i >= 0; i--) {
            var pro = result[i][0];
            var fd = getF.getCatgoryById(pro.proCatID);
            var item = {
                Product: pro,
                fd: fd,
                Quantity: req.session.cart[i].proQuantity,
                Amount: pro.proPrice * req.session.cart[i].proQuantity
            };
            toTal += pro.proPrice * req.session.cart[i].proQuantity;
            items.push(item);
        }
        u = result[result.length - 1][0];
        
        ship=50000;
        toTal_ship= toTal + ship;
        var vm = {
            items: items,
            total: toTal,
            ship: ship,
            total_ship: toTal_ship,
            user: u,
            layout: 'profileLayout.handlebars',
        };
        res.render('cart/pay', vm);
    });
});

router.post('/add', (req, res) => {
    var item = {
        proID: req.body.proID,
        proQuantity: +req.body.proQuantity
    };

    cartRepo.add(req.session.cart, item);
    console.log(req.session.cart),
    res.redirect(req.headers.referer);
});

router.post('/remove', (req, res) => {
    cartRepo.remove(req.session.cart, req.body.proID_R);
    res.redirect(req.headers.referer);
});

router.post('/change', (req, res) => {
    console.log(req.session.cart)
    var item = {
        proID: req.body.proID_C,
        proQuantity: +req.body.proQuantity_C
    };
    cartRepo.change(req.session.cart, item);
    res.redirect(req.headers.referer);
});

router.post('/pay', (req, res) => {
    var arr = [];
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.loadProductByID(cartItem.proID);
        arr.push(p);
    }
    var toTal = 0, ship = 0, toTal_ship = 0;
    Promise.all(arr).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            toTal += pro.proPrice * req.session.cart[i].proQuantity;
        }       
        ship=50000;
        toTal_ship= toTal + ship;
        var date = moment(new Date()).format('YYYY-MM-DDTHH:mm');
        var order={
            OrderDate: date,
            UserID: req.session.users.id,
            Ship: ship,
            Total: toTal_ship,
        }
        cartRepo.insertOrder(order);
        //var oid = cartRepo.insertOrder(order);
       // result.push(oid);
        //console.log(oid);
        return result;
    }).then(result => {
        console.log(result);
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            var item = {
                OrderID: 1,
                ProID: pro.proID,
                Price: pro.Price,
                Quantity: req.session.cart[i].proQuantity,
                Amount: pro.proPrice * req.session.cart[i].proQuantity
            };
            cartRepo.insertOrderDetail(item);
        }
        req.session.cart=[];
        return null;
    });
    console.log(req.session.cart);
    res.redirect('/');
});
module.exports = router;