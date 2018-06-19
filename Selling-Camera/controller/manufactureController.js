var express = require('express');
var proRepo = require('../repository/productRepo');
var getFolder = require('../fn/getFolder');
var moment = require('moment');
var router = express.Router();
router.get('/', (req, res) => {

    var vm = {
        manID: req.query.id
    }
    var ID =getFolder.getManufactureByName(vm.manID);
    proRepo.loadProductByManuID(ID).then(rows => {
        for (r of rows) {
            var time = moment(r.proDate,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
            r['proDate'] = time;
            r["catName"] = getFolder.getCatgoryById(r.proCatID);
        }
        var allPros = {
            ManID: vm.manID,
            proCodes: rows
        }
        res.render('manufacture/index', allPros);
    });

});
module.exports = router;