var express = require('express');
var cartRepo = require('../repository/cartRepo');
var productRepo = require('../repository/productRepo');
var getF = require('../fn/getFolder');

var router = express.Router();

router.get('/', (req, res) => {

    var arr = [];
    req.session.cart=[{proID:'1', proQuantity:1}, {proID:'2', proQuantity:2}, {proID:'3', proQuantity:2}];
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

router.post('/add', (req, res) => {
    req.session.cart.push({proID: 2, proQuantity:1});
    console.log(req.session.cart)
    var item = {
        proID: req.body.proID,
        proQuantity: +req.body.proQuantity
    };

    cartRepo.add(req.session.cart, item);
    res.redirect(req.headers.referer);
});

router.post('/remove', (req, res) => {
    console.log(req.session.cart)
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
module.exports = router;