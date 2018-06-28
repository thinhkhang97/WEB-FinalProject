var db = require('../fn/db');
exports.getManufactureByName = name =>{
    return db.load(`select manID from manufacture where manName='${name}'`);
}
exports.getManufactureById = id =>{
    return db.load(`select manName from manufacture where manID=${id}`)
}
exports.loadProductByManuID = ID =>{
    return db.load(`select product.*, catCode from product join category on product.proCatID = category.catID where proManID=${ID}`)
}
exports.getAllManufactures = () =>{
    return db.load(`select * from manufacture`);
}

