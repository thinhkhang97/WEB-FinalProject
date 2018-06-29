var express = require('express');
var userRepo = require('../repository/accountRepo');
var router = express.Router();
var db=require('../fn/db');

router.get('/',(req, res)=>{
    userRepo.loadAllAccount().then(rows=>{
        var vm = {
            layout:'admin.handlebars',
            catgory:rows
        }
        console.log(vm);
        res.render('adminUser/index',vm);
    });
    
});
router.get('/delete', (req, res) => {
    userRepo.loadAccount(req.query.Id).then(rows=>
        {
            var vm = {
                layout: 'admin.handlebars',
                ID:rows[0].ID,
                hoten: rows[0].hoten,
                dthoai: rows[0].dthoai,
                diachi: rows[0].diachi,
                email: rows[0].email,
                username: rows[0].username
            }
            console.log(vm);
            res.render('adminUser/delete', vm);
        });
});
router.get('/edit',(req,res)=>{
    userRepo.loadAccount(req.query.Id).then(rows=>{
         var vm = {
             layout: 'admin.handlebars',
             ID:rows[0].ID,
                hoten: rows[0].hoten,
                dthoai: rows[0].dthoai,
                diachi: rows[0].diachi,
                email: rows[0].email,
                username: rows[0].username
         }
         res.render('adminUser/edit', vm);
    });
 });
router.post('/delete',(req,res)=>{
    var vm = {
        ID:req.body.ID
    }
    userRepo.deleteUser(vm).then(rows=>{
        var vm2 = {
            layout: 'admin.handlebars'
        }
        res.redirect('/adminUser');
    });
});
router.post('/edit',(req,res)=>{
    var vm = {
        ID: req.body.ID,
        hoten:req.body.hoten,
        dthoai: req.body.dthoai,
        diachi:req.body.diachi,
        email:req.body.email,
        username:req.body.username
    }
    userRepo.updateUser(vm).then(rows=>{
        var vm2 = {
            layout: 'admin.handlebars'
        }
        res.redirect('/adminUser');
    });
});
module.exports = router;