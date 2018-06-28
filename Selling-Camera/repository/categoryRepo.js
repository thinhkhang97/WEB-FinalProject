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

exports.getAllCatgories = () =>{
    return db.load(`select * from category`);
}

exports.insertNewCatgory = c =>{
    return db.save(`insert into category (catCode,catName,catInfo) values ('${c.catCode}','${c.catName}','${c.catInfo}')`);
}

exports.deleteCategory = c=>{
    return db.save(`delete from category where catID = ${c.catID}`);
}
