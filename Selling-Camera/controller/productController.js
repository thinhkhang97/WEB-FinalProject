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
        Promise.all([p1,p2]).then(([r1,r2])=>{
            product["proCat"] = r1[0].catCode;
            product["proMan"] = r2[0].manName;
            product["catName"] = r1[0].catName;
            res.render('product/detail',product);
        });
    });    
});
module.exports = router;