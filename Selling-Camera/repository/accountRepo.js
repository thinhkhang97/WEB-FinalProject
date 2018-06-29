var  db = require('../fn/db');

exports.loadAccount = (id)=>{
    var sql = `select * from users where ID='${id}'`;
    return db.load(sql);
}
exports.update = (c) =>{
    var sql = `update users set hoten = '${c.hoten}', gioitinh = '${c.gioitinh}', dthoai = '${c.dthoai}', ngaysinh = '${c.ngaysinh}', diachi = '${c.diachi}', passwords = '${c.passwords}' where ID = ${c.ID}`;
    return db.save(sql);
}

exports.loadOrder = (id) => {
    var sql = `select * from orders where UserID='${id}' ORDER BY OrderDate DESC`;
    return db.load(sql);
}

exports.loadOrderUsers = (id) => {
    var sql = `SELECT *
    FROM orders, users
    WHERE orders.OrderID='${id}'AND orders.UserID = users.ID`;
    return db.load(sql);
}
exports.loadOrderDetail = (id) => {
    var sql = `SELECt orderdetails.*, product.proCode, product.proName, product.proCatID
    FROM orderdetails, product
    where orderdetails.OrderID = '${id}' AND orderdetails.ProID = product.proID`;
    return db.load(sql);
}
