var express = require('express');
var cartRepo = require('../repository/cartRepo');
    productRepo = require('../repository/productRepo');

var router = express.Router();

router.get('/', (req, res) => {

    var arr_p = [];
    console.log(req.session.cart)
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.single(cartItem.ProId);
        arr_p.push(p);
    }

    var items = [];
    Promise.all(arr_p).then(result => {
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];
            var item = {
                Product: pro,
                Quantity: req.session.cart[i].Quantity,
                Amount: pro.Price * req.session.cart[i].Quantity
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
        ProId: req.body.proId,
        Quantity: +req.body.quantity
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