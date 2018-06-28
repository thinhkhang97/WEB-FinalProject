var express = require('express');
var router = express.Router();
var db=require('../fn/db');

router.get('/',(req, res)=>{
    var vm={
        layout:'admin.handlebars'
    }
    res.render('admin/index',vm);
});
module.exports = router;