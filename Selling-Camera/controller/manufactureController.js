var express = require('express');
var proRepo = require('../repository/productRepo');
var manRepo = require('../repository/manufactureRepo');
var catRepo = require('../repository/categoryRepo');
var moment = require('moment');
var router = express.Router();
router.get('/', (req, res) => {
    var vm = {
        manID: req.query.id
    }
    var pID = manRepo.getManufactureByName(vm.manID).then(ids=>{
        var ID = ids[0].manID;
        var pro = manRepo.loadProductByManuID(ID).then(rows => {
            var pArray = [];
            for (r of rows) {
                var time = moment(r.proDate,'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
                r['proDate'] = time;
            }
            var allPros = {
                ManID: vm.manID,
                proCodes: rows
            }
            res.render('manufacture/index', allPros);
        });
    });
});
module.exports = router;