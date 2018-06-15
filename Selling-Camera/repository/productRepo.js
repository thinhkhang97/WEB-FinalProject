var  db = require('../fn/db');

exports.loadProductByCatID = catID=>{
    return db.load(`select proCode,proPrice from product where proCatID=${catID}`)
}

exports.loadProductByManuID = manID=>{
    return db.load(`select proCode,proPrice,proCatID from product where proManID=${manID}`)
}