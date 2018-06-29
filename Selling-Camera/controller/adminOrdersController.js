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
router.get('/edit',(req,res)=>{
    orderRepo.loadAnOrders(req.query.Id).then(rows=>{
        var vm={
            layout:'admin.handlebars',
            OrderID:rows[0].OrderID,
            Status:rows[0].Status
        }
        res.render('adminOrders/edit',vm);
    });
});
router.get('/detail',(req,res)=>{
    orderRepo.loadAnDetailOrders(req.query.Id).then(rows=>{
        var vm={
            layout:'admin.handlebars',
            order:rows
        }
        res.render('adminOrders/detail',vm);
    });
});
router.post('/edit',(req,res)=>{
    var vm = {
        Status:req.body.Status,
        OrderID:req.body.OrderID
    }
    orderRepo.updateStatus(vm).then(rows=>{
        console.log('[SUCCESS] edit order id='+vm.OrderID);
        res.redirect('/adminOrder');
    })
});
module.exports = router;