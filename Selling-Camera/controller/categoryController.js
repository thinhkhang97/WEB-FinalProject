var express = require('express');
var router = express.Router();
router.get('/',(req,res)=>{
    var vm = {
        catID: req.query.id
    }
    res.render('category/index',vm);
});
module.exports = router;