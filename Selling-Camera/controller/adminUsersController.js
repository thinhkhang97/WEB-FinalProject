var express = require('express');
var userRepo = require('../repository/accountRepo');
var router = express.Router();
var db=require('../fn/db');

router.get('/',(req, res)=>{
    userRepo.loadAllAccount().then(rows=>{
        var vm = {
            catgory:rows
        }
        console.log(vm);
        res.render('adminUser/index',vm);
    });
    
});

module.exports = router;