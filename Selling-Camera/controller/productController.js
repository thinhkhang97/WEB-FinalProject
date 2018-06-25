var express = require('express');
var productRepo = require('../repository/productRepo');
var manRepo = require('../repository/manufactureRepo');
var catRepo = require('../repository/categoryRepo');
var moment = require('moment');
var router = express.Router();

router.get('/',(req,res)=>{
    var id = req.query.id;
    productRepo.loadProductByID(id).then(rows=>{
        var product = rows[0];
        var p1 = catRepo.getCatgoryById(product.proCatID);
        var p2 = manRepo.getManufactureById(product.proManID);
        var p3 = productRepo.load5ProductByCatID(product.proCatID);
        var p4 = productRepo.load5ProductByManID(product.proManID);
        Promise.all([p1,p2,p3,p4]).then(([r1,r2,r3,r4])=>{
            product["proCat"] = r1[0].catCode;
            product["proMan"] = r2[0].manName;
            product["catName"] = r1[0].catName;
            for(r of r3){
                var time = moment(r.proDate,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
                r['proDate'] = time;
            }
            for(r of r4){
                var time = moment(r.proDate,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
                r['proDate'] = time;
            }
            var vm = {
                product:product,
                prosSameMan:r4,
                prosSameCat:r3
            }
            console.log('[SUCCESS] Loaded all products');
            console.log('[NOTIFY] Render to product details');
            res.render('product/detail',vm);
        });
    });    
});
module.exports = router;