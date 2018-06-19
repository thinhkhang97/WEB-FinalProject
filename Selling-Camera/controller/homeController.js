var express = require('express');
var productRepo = require('../repository/productRepo');
var getF = require('../fn/getFolder');
var moment = require('moment');
var router = express.Router();

router.get('/',(req,res)=>{
    var p1 = productRepo.loadTop10Newest();
    var p2 = productRepo.loadTop10Hot();
    var p3 = productRepo.loadTop10View();
    Promise.all([p1,p2,p3]).then(([topNew,topHot,topView])=>{
        for(t of topNew){
            var time = moment(t.proDate,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
            t['proDate'] = time;
            t["catName"] = getF.getCatgoryById(t.proCatID);
        }
        for(t of topHot){
            var time = moment(t.proDate,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
            t['proDate'] = time;
            t["catName"] = getF.getCatgoryById(t.proCatID);
        }
        for(t of topView){
            var time = moment(t.proDate,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
            t['proDate'] = time;
            t["catName"] = getF.getCatgoryById(t.proCatID);
        }
        var vm = {
            top10Newest:topNew,
            top10Hot:topHot,
            top10View:topView
        }
        res.render('home/index',vm);
    });
});

module.exports = router;