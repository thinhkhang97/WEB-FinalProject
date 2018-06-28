var express = require('express');
var manRepo = require('../repository/manufactureRepo');
var router = express.Router();
var db=require('../fn/db');

router.get('/',(req, res)=>{
    manRepo.getAllManufactures().then(rows=>{
        var vm = {
            catgory:rows
        }
        console.log(vm);
        res.render('adminMan/index',vm);
    });
    
});

module.exports = router;