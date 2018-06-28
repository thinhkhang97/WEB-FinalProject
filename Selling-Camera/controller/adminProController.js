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
module.exports = router;