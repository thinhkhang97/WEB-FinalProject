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

exports.loadAllProducts = () =>{
    return db.load(`select * from product`);
}

exports.insertNewProduct = p =>{
    return db.save(`insert into product (proCode,proName,proPrice,proView,proAvailable,proQuantity,proCatID,proManID,proSpeed,proMadeIn,proSize,proSup,proDate) 
        values('${p.proCode}','${p.proName}',${p.proPrice},0,true,${p.proQuantity},${p.proCatID},${p.proManID},${p.proSpeed},'${p.proMadeIn}','${p.proSize}','${p.proSup}','${p.proDate}')`);
}

exports.deleteProductByID = id =>{
    return db.save(`delete from product where proID=${id}`);
}

exports.updateProduct = p =>{
    return db.save(`update product set proCode='${p.proCode}',proName='${p.proName}',proPrice=${p.proPrice},proQuantity=${p.proQuantity},proCatID=${p.proCatID},proManID=${p.proManID},proSpeed=${p.proSpeed},proMadeIn='${p.proMadeIn}',proSize='${p.proSize}',proSup='${p.proSup}',proDate='${p.proDate}' where proID=${p.proID}`)
}