var db = require('../fn/db');
exports.getCatgoryById = id => {
   return db.load(`select * from category where catID = ${id}`);
}

exports.getNameCatgoryById = id => {
   return db.load(`select catName from category where catID = ${id}`);
}

exports.getCatgoryByCatName = name =>{
    return db.load(`select catCode from category where catID = '${name}'`);
}