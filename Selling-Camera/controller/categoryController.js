var express = require('express');
var productRepo = require('../repository/productRepo');
var getF = require('../fn/getFolder');
var moment = require('moment');
var router = express.Router();
router.get('/', (req, res) => {
    var vm = {
        catID: req.query.id
    }
    var name = getF.getCatgoryById(parseInt(vm.catID));
    productRepo.loadProductByCatID(vm.catID).then(rows => {
        for (var r of rows) {
            var time = moment(r.proDate, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
            r['proDate'] = time;
            r["catName"] = name;
        }
        var allPros = {
            catID: req.query.id,
            proCodes: rows
        }
        res.render('category/index', allPros);
    });

});
module.exports = router;