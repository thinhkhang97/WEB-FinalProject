var express = require('express');
var router = express.Router();
var db=require('../fn/db');

router.get('/',(req, res)=>{
    res.render('admin/index');
});
module.exports = router;