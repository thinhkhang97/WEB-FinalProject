var express = require('express');
var cartRepo = require('../repository/cartRepo');
var productRepo = require('../repository/productRepo');
var getF = require('../fn/getFolder');
var accountRepo = require('../repository/accountRepo');
var moment = require('moment');
var db=require('../fn/db');

var router = express.Router();
router.get('/', (req, res) => {
    var arr = [];
    if(req.session.cart.length == 0){
    }
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
    if(req.session.cart.length == 0){
        //res.redirect('/home');
    }
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
    console.log(req.body.proID_R);
    cartRepo.remove(req.session.cart, req.body.proID_R);
    res.redirect(req.headers.referer);
});

router.post('/change', (req, res) => {
    var item = {
        proID: req.body.proID_C,
        proQuantity: +req.body.proQuantity_C
    };
    console.log(item);
    cartRepo.change(req.session.cart, item);  
    console.log(req.session.cart);
    res.redirect(req.headers.referer);
});

router.post('/pay', (req, res) => {
    var arr = [];
    console.log("Processing orders");
    for (var i = 0; i < req.session.cart.length; i++) {
        var cartItem = req.session.cart[i];
        var p = productRepo.loadProductByID(cartItem.proID);
        arr.push(p);
    }
    var items=[];
    var toTal = 0, ship = 0, toTal_ship = 0;
    Promise.all(arr).then(result => {
        
        for (var i = result.length - 1; i >= 0; i--) {
            var pro = result[i][0];    
            var item = {
                ProID: pro.proID,
                oldQuantity: pro.proQuantity,
                Price: pro.proPrice,
                Quantity: req.session.cart[i].proQuantity,
                Amount: pro.proPrice * req.session.cart[i].proQuantity
            };
            items.push(item);
            toTal += pro.proPrice * req.session.cart[i].proQuantity;
        }       
        ship=50000;
        toTal_ship= toTal + ship;
        var date = moment(new Date()).format('YYYY-MM-DDTHH:mm');
        var order={
            OrderDate: date,
            UserID: req.session.user.ID,
            Ship: ship,
            Total: toTal_ship,
        }
        cartRepo.insertOrder(order);
        var a1 = cartRepo.loadId(order);
        Promise.all([a1]).then(([at])=>{
        var sql = `select OrderID from orders where OrderDate = '${order.OrderDate}' AND UserID = '${order.UserID}' AND Total = '${order.Total}'`;
        db.load(sql).then(rows=>{
            var id = rows[0].OrderID;

            console.log(id);
            for(var i = 0; i < items.length; i++){
                cartRepo.insertOrderDetail(items[i], id);
                var q = items[i].oldQuantity - items[i].Quantity;
                console.log(items[i].ProID);
                cartRepo.updateQuantity(q, items[i].ProID);
            }
            req.session.cart=[];
            res.redirect('/');
        });
        });
    });
});
module.exports = router;