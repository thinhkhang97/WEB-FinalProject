var  db = require('../fn/db');

exports.loadAccount = (id)=>{
    return db.load(`select * from users where ID=${id}`)
}
exports.update = (c) =>{
    var sql = `update users set hoten = '${c.hoten}', gioitinh = '${c.gioitinh}', dthoai = '${c.dthoai}', ngaysinh = '${c.ngaysinh}', diachi = '${c.diachi}', passwords = '${c.passwords}' where ID = ${c.ID}`;
    return db.save(sql);
}
