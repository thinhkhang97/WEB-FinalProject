var express = require('express');
var orderRepo = require('../repository/ordersRepo');
var router = express.Router();

router.get('/',(req,res)=>{
    orderRepo.loadAllOrders().then(rows=>{
        var vm={
            order:rows,
            layout:'admin.handlebars'
        }
        res.render('adminOrders/index',vm);
    });
});
module.exports = router;