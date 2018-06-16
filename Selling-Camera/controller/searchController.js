var express = require('express');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render('search/index', {
        login: false
    });
});

module.exports = router;