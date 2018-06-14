var express = require('express');
var router = express.Router();
router.get('/',(req,res)=>{
    var vm = {
        catID: req.query.id
    }
    res.render('manufacture/index',vm);
});
module.exports = router;