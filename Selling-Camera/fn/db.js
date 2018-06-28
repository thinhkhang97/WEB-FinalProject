var mysql = require('mysql');


exports.load = sql =>{
   return new Promise((resolve, reject)=>{
        var con = mysql.createConnection({
            host: 'localhost',
            port:3306,
            user:'root',
            database:'camera'
        });

        con.connect((err)=>{
            if(err) throw err;
        });

        con.query(sql,(err, rows, field)=>{
            if(err) reject(err);
            else resolve(rows)
        });

        con.end();
    });
}

exports.save = sql=>{
    return new Promise((resolve, reject)=>{
        var con = mysql.createConnection({
            host:'localhost',
            port:3306,
            user:'root',
            database:'camera'
        });

        con.connect();

        con.query(sql,(err,value)=>{
            if(err) reject(err);
            resolve(value);
        })

        con.end();
    });
}