var  db = require('../fn/db');

exports.loadOrder = (id)=>{
    var sql = `select * from orders where OrderID='${id}'`;
    return db.load(sql);
}
exports.loadId = (order)=>{
    var sql = `select OrderID from orders where OrderDate = '${order.OrderDate}' AND UserID = '${order.UserID}' AND Total = '${order.Total}'`;
    return db.load(sql);
}
exports.insertOrder= order => {
    var sql = `insert into orders(OrderDate, UserID, Ship, Total) values('${order.OrderDate}', '${order.UserID}', '${order.Ship}', '${order.Total}')`;
    return db.save(sql);
}

exports.insertOrderDetail = orderdetail => {
    var sql = `insert into orderdetails(OrderID, ProID, Quantity, Price, Amount) values('${orderdetail.OrderID}', '${orderdetail.ProID}', '${orderdetail.Quantity}', '${orderdetail.Price}', '${orderdetail.Amount}')`;
    return db.save(sql);
}


exports.add = (cart, item) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].proID === item.proID) {
            cart[i].proQuantity += item.proQuantity;
            return;
        }
    }
    cart.push(item);
}

exports.remove = (cart, proID) => {
    for (var i = cart.length - 1; i >= 0; i--) {
        if (proID === cart[i].proID) {
            cart.splice(i, 1);
            return;
        }
    }
}

exports.change = (cart, item) => {
    for (i = cart.length - 1; i >= 0; i--) {
        if (cart[i].proID === item.proID) {
            cart[i].proQuantity = item.proQuantity;
            return;
        }
    }
}
