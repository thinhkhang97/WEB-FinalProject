var express = require('express');
var manRepo = require('../repository/manufactureRepo');
var router = express.Router();
var db=require('../fn/db');

router.get('/',(req, res)=>{
    manRepo.getAllManufactures().then(rows=>{
        var vm = {
            catgory:rows
        }
        console.log(vm);
        res.render('adminMan/index',vm);
    });
});

router.get('/add', (req, res) => {
    var vm = {
        layout: 'admin.handlebars'
    }
    res.render('adminMan/add', vm);
});

router.get('/delete', (req, res) => {
    manRepo.getAManufactures(req.query.Id).then(rows=>
        {
            var vm = {
                layout: 'admin.handlebars',
                manID:rows[0].manID,
                manName: rows[0].manName,
                manCountry: rows[0].manCountry,
                manInfo: rows[0].manInfo
            }
            console.log(vm);
            res.render('adminMan/delete', vm);
        });
});

router.post('/add', (req, res) => {
    var vm = {
        manName: req.body.manName,
        manCountry: req.body.manCountry,
        manInfo: req.body.manInfo
    }
    manRepo.insertNewManufactures(vm).then(rows => {     
        var vm2 = {
            _ok: true,
            layout: 'admin.handlebars'
        }
        console.log('[SUCCESS] Insert manufactures: ' + vm);
        res.render('adminMan/add', vm2);
    });
});
router.post('/delete',(req,res)=>{
    var vm = {
        manID:req.body.manID
    }
    manRepo.deleteManufacetures(vm).then(rows=>{
        var vm2 = {
            layout: 'admin.handlebars'
        }
        res.redirect('/adminMan');
    });
});
module.exports = router;