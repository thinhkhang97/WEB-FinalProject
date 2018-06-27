var  db = require('../fn/db');

exports.loadProductByCatID = catID=>{
    return db.load(`select * from product where proCatID=${catID}`)
}

exports.loadProductByManuID = manID=>{
    return db.load(`select * from product where proManID=${manID}`)
}

exports.loadProductByNameAndPrice = (name, price) =>{
    return db.load(`select * from product where proName like '${name}%' and proPrice <= ${price}`)
}

exports.loadTop10Newest = ()=>{
    return db.load(`select * from product order by proDate desc limit 10`)
}

exports.loadTop10Hot = ()=>{
    return db.load(`select * from product order by proQuantity desc limit 10`)
}

exports.loadTop10View = ()=>{
    return db.load(`select * from product order by proView desc limit 10`)
}

exports.loadProductByID = id=>{
    return db.load(`select * from product where proID = ${id}`);
}

exports.load5ProductByCatID = catID=>{
    return db.load(`select * from product join category on proCatID = catID where proCatID=${catID} order by proView desc limit 5`);
}

exports.load5ProductByManID = manID=>{
    return db.load(`select * from product join category on proCatID = catID where proManID=${manID} order by proView desc limit 5`);
}