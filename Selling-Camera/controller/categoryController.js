var express = require('express');
var productRepo = require('../repository/productRepo');
var router = express.Router();
router.get('/', (req, res) => {
    var vm = {
        catID: req.query.id
    }
    var ID = 1;
    var name = "DSLR";
    if (vm.catID === 'DSLR'){
        ID = 1;
        name = "DSLR"
    }
        
    else if (vm.catID === 'Travel')
    {
        ID = 2;
        name = "DuLich"
    }
    else if (vm.catID === 'snapshot')
    {
        ID = 3;
        name = "LayLien"
    }
    else {
        ID = 4;
        name = "Mirr"
    }
    productRepo.loadProductByCatID(ID).then(rows => {
        for(var r of rows)
            r["catName"] = name;
        var allPros = {
            catID: req.query.id,
            proCodes: rows
        }
        console.log(rows);
        res.render('category/index', allPros);
    });

});
module.exports = router;