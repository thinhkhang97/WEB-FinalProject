var  db = require('../fn/db');

exports.loadAccount= ID=>{
    return db.load(`select * from users where ID=${ID}`)
}
