var db = require('../fn/db');
exports.loadAllOrders = ()=>{
    return db.load(`SELECT * FROM orders`);
}