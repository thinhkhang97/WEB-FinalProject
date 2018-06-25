var express = require('express');
var router = express.Router();
var productRepo = require('../repository/productRepo');
var db = require('../fn/db');

router.get('/', (req, res) => {
    res.render('search/index', {
        login: false
    });
});
router.post('/', (req, res) => {
    var tenSP=req.body.tenSP;
    var giaSP = parseInt(req.body.giaSP);
    if(isNaN(giaSP))
        giaSP = 1000000000;
    productRepo.loadProductByNameAndPrice(tenSP,giaSP).then(rows=>{
        for (r of rows) {
            if (r.proCatID === 1)
                r["catName"] = "DSLR"
            else if (r.proCatID === 2)
                r["catName"] = "DuLich"
            else if (r.proCatID === 3)
                r["catName"] = "LayLien"
            else
                r["catName"] = "Mirr"
        }
        console.log('[SUCCESS] Searched');
        var vm = {
            proCodes:rows
        }
        res.render('search/index',vm);
    }).catch(err=>{
        console.log('[ERROR] Cannot search');
    })
});
module.exports = router;