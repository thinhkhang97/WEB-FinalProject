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
