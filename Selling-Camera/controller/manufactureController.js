var express = require('express');
var proRepo = require('../repository/productRepo');
var router = express.Router();
router.get('/', (req, res) => {

    var vm = {
        manID: req.query.id
    }
    var ID = 1;
    if (vm.manID === 'Cannon') {
        ID = 1;
    }

    else if (vm.manID === 'Sony') {
        ID = 2;
    }
    else if (vm.manID === 'Nikon') {
        ID = 3;
    }
    else {
        ID = 4;
    }
    proRepo.loadProductByManuID(ID).then(rows => {
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
        console.log(rows);
        var allPros = {
            ManID: vm.manID,
            proCodes: rows
        }
        res.render('manufacture/index', allPros);
    });

});
module.exports = router;