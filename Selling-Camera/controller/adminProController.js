var express = require('express');
var proRepo = require('../repository/productRepo');
var router = express.Router();
var moment = require('moment');
var db=require('../fn/db');

router.get('/',(req, res)=>{
    proRepo.loadAllProducts().then(rows=>{
        for(t of rows){
            var time = moment(t.proDate,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
            t['proDate'] = time;
        }
        var vm = {
            catgory:rows
        }
        console.log(vm);
        res.render('adminPro/index',vm);
    });
    
});

router.get('/add',(req,res)=>{
    var vm = {
        layout:'admin.handlebars'
    }
    res.render('adminPro/add',vm);
});
router.get('/delete',(req,res)=>{
    proRepo.loadProductByID(req.query.Id).then(rows=>{
        var  vm = {
            layout:'admin.handlebars',
            proID:rows[0].proID,
            proCode:rows[0].proCode,
            proName:rows[0].proName,
            proPrice:rows[0].proPrice,
            proQuantity:rows[0].proQuantity,
            proCatID:rows[0].proCatID,
            proManID:rows[0].proManID,
            proSpeed:rows[0].proSpeed,
            proMadeIn:rows[0].proMadeIn,
            proSize:rows[0].proSize,
            proSup:rows[0].proSup
        }
        res.render('adminPro/delete',vm);
    });
});
router.post('/add',(req,res)=>{
    var  vm = {
        proCode:req.body.proCode,
        proName:req.body.proName,
        proPrice:req.body.proPrice,
        proQuantity:req.body.proQuantity,
        proCatID:req.body.proCat,
        proManID:req.body.proMan,
        proSpeed:req.body.proSpeed,
        proMadeIn:req.body.proMadeIn,
        proSize:req.body.proSize,
        proSup:req.body.proSup
    }
    proRepo.insertNewProduct(vm).then(rows=>{
        var vm2 = {
            _ok:true,
            layout:'admin.handlebars'
        }
        res.render('adminPro/add',vm2);
    });
});
router.post('/delete',(req,res)=>{
    console.log(req.body.proID);
    proRepo.deleteProductByID(req.body.proID).then(rows=>{
        console.log('[SUCCESS] Deleted product id='+req.body.proID);
        res.redirect('/adminPro');
    });
});
router.get('/edit',(req,res)=>{
    proRepo.loadProductByID(req.query.Id).then(rows=>{
        var  vm = {
            layout:'admin.handlebars',
            proID:rows[0].proID,
            proCode:rows[0].proCode,
            proName:rows[0].proName,
            proPrice:rows[0].proPrice,
            proQuantity:rows[0].proQuantity,
            proCatID:rows[0].proCatID,
            proManID:rows[0].proManID,
            proSpeed:rows[0].proSpeed,
            proMadeIn:rows[0].proMadeIn,
            proSize:rows[0].proSize,
            proSup:rows[0].proSup
        }
        res.render('adminPro/edit',vm);
    });
});
router.post('/edit',(req,res)=>{
    var  vm = {
        proID:req.body.proID,
        proCode:req.body.proCode,
        proName:req.body.proName,
        proPrice:req.body.proPrice,
        proQuantity:req.body.proQuantity,
        proCatID:req.body.proCat,
        proManID:req.body.proMan,
        proSpeed:req.body.proSpeed,
        proMadeIn:req.body.proMadeIn,
        proSize:req.body.proSize,
        proSup:req.body.proSup
    }
    proRepo.updateProduct(vm).then(rows=>{
        console.log('[SUCCESS] Edited product id='+req.body.proID);
        res.redirect('/adminPro');
    });
});
module.exports = router;