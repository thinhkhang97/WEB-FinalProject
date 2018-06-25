var express = require('express');
var productRepo = require('../repository/productRepo');
var catRepo = require('../repository/categoryRepo');
var moment = require('moment');
var router = express.Router();
router.get('/', (req, res) => {
    var vm = {
        catID: req.query.id
    }
    var pname = catRepo.getCatgoryById(parseInt(vm.catID));
    var ppro = productRepo.loadProductByCatID(vm.catID);
    Promise.all([pname,ppro]).then(([names,rows])=>{
        var name = names[0].catCode;
        for (var r of rows) {
            var time = moment(r.proDate, 'YYYY-MM-DD HH:mm').format('DD-MM-YYYY');
            r['proDate'] = time;
            r["catName"] = name;
        }
        var allPros = {
            catID: req.query.id,
            proCodes: rows
        }
        console.log('[SUCCESS] Loaded category')
        res.render('category/index', allPros);
    }).catch(([err1, err2])=>{
        if(err1) console.log('[ERROR] load catCode');
        if(err2) console.log('[ERROR] load product')
    });
});
module.exports = router;