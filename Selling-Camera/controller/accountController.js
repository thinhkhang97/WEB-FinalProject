var express = require('express');
var userRepo = require('../repository/accountRepo');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('profile/index');
});
router.post('/', (req, res) => {
    
});
module.exports = router;