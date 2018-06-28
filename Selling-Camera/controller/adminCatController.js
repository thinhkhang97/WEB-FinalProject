var express = require('express');
var catRepo = require('../repository/categoryRepo');
var router = express.Router();
var db = require('../fn/db');

router.get('/', (req, res) => {
    catRepo.getAllCatgories().then(rows => {
        var vm = {
            catgory: rows
        }
        console.log(vm);
        res.render('adminCat/index', vm);
    });

});
router.get('/add', (req, res) => {
    var vm = {
        layout: 'admin.handlebars'
    }
    res.render('adminCat/add', vm);
});

router.get('/delete', (req, res) => {
    catRepo.getCatgoryById(req.query.Id).then(rows => {
        var vm = {
            layout: 'admin.handlebars',
            catID:rows[0].catID,
            catCode: rows[0].catCode,
            catName: rows[0].catName,
            catInfo: rows[0].catInfo
        }
        console.log('[SUCCESS] Get category'+vm);
        res.render('adminCat/delete', vm);
    });
});
router.get('/edit',(req,res)=>{
   catRepo.getCatgoryById(req.query.Id).then(rows=>{
        var vm = {
            layout: 'admin.handlebars',
            catID:rows[0].catID,
            catCode: rows[0].catCode,
            catName: rows[0].catName,
            catInfo: rows[0].catInfo
        }
        console.log('[SUCCESS] Get category'+vm);
        res.render('adminCat/edit', vm);
   });
});
router.post('/add', (req, res) => {
    var vm = {
        catCode: req.body.catCode,
        catName: req.body.catName,
        catInfo: req.body.catInfo
    }
    catRepo.insertNewCatgory(vm).then(rows => {     
        var vm2 = {
            _ok: true,
            layout: 'admin.handlebars'
        }
        console.log('[SUCCESS] Insert category: ' + vm);
        res.render('adminCat/add', vm2);
    });
});
router.post('/delete',(req,res)=>{
    var vm = {
        catID:req.body.catID
    }
    catRepo.deleteCategory(vm).then(rows=>{
        var vm2 = {
            layout: 'admin.handlebars'
        }
        res.redirect('/adminCat');
    });
});
router.post('/edit',(req,res)=>{
    var vm = {
        catID: req.body.catID,
        catCode:req.body.catCode,
        catName: req.body.catName,
        catInfo:req.body.catInfo
    }
    catRepo.updateCategory(vm).then(rows=>{
        var vm2 = {
            layout: 'admin.handlebars'
        }
        res.redirect('/adminCat');
    });
});
module.exports = router;