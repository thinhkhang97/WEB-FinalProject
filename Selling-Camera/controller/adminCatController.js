var express = require('express');
var catRepo = require('../repository/categoryRepo');
var router = express.Router();
var db=require('../fn/db');

router.get('/',(req, res)=>{
    catRepo.getAllCatgories().then(rows=>{
        var vm = {
            catgory:rows
        }
        console.log(vm);
        res.render('adminCat/index',vm);
    });
    
});

module.exports = router;