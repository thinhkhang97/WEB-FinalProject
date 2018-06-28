var  db = require('../fn/db');

exports.loadAccount = (id)=>{
    var sql = `select * from users where ID='${id}'`;
    return db.load(sql);
}
exports.update = (c) =>{
    var sql = `update users set hoten = '${c.hoten}', gioitinh = '${c.gioitinh}', dthoai = '${c.dthoai}', ngaysinh = '${c.ngaysinh}', diachi = '${c.diachi}', passwords = '${c.passwords}' where ID = ${c.ID}`;
    return db.save(sql);
}
exports.loadAllAccount = ()=>{
    return db.load(`select * from users`);
}
exports.deleteUser= c=>{
    return db.save(`delete from users where ID = ${c.ID}`);
}
exports.updateUser = c=>{
    return db.save(`update users set hoten='${c.hoten}',dthoai='${c.dthoai}',diachi='${c.diachi}',email='${c.email}',username='${c.username}' where ID=${c.ID}`);
}
