var express = require('express');
var cartRepo = require('../repository/cartRepo');
    productRepo = require('../repository/productRepo');

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
    Promise.all(arr).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            var item = {
                Product: pro,
                Quantity: req.session.cart[i].proQuatity,
                Amount: pro.Price * req.session.cart[i].proQuatity
            };
            items.push(item);
        }

        var vm = {
            items: items
        };
        res.render('cart/index', vm);
    });
});

router.post('/add', (req, res) => {
    console.log(req.session.cart)
    var item = {
        proID: req.body.proID,
        proQuatity: +req.body.quatity
    };

    cartRepo.add(req.session.cart, item);
    res.redirect(req.headers.referer);
});

router.post('/remove', (req, res) => {
    console.log(req.session.cart)
    cartRepo.remove(req.session.cart, req.body.ProId);
    res.redirect(req.headers.referer);
});

module.exports = router;