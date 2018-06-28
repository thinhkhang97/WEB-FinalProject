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
exports.getAManufactures=ID=>{
    return db.load(`select * from manufacture where manID=${ID}`);
}
exports.insertNewManufactures = c =>{
    return db.save(`insert into manufacture (manName,manCountry,manInfo) values ('${c.manName}','${c.manCountry}','${c.manInfo}')`);
}
exports.deleteManufacetures = c=>{
    return db.save(`delete from manufacture where manID = ${c.manID}`);
}