var db = require('../fn/db');
exports.loadAllOrders = ()=>{
    return db.load(`SELECT * FROM orders`);
}
exports.loadAnOrders = id =>{
    return db.load(`select * from orders where OrderID = ${id}`);
}
exports.updateStatus = o =>{
    return db.load(`update orders set Status='${o.Status}' where OrderID = ${o.OrderID}`);
}