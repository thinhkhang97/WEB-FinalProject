var express = require('express');
var handlebars = require('express-handlebars');
var handlebars_sections = require('express-handlebars-sections');
var body_parser = require('body-parser');
var path = require('path');
var wnumb = require('wnumb');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var homeController = require('./controller/homeController');
var categoryController = require('./controller/categoryController');
var manufactureController = require('./controller/manufactureController');
var registerController=require('./controller/registerController');
var loginController=require('./controller/loginController');
var searchController=require('./controller/searchController');
var accountController=require('./controller/accountController');
var productController = require('./controller/productController');
var handleLayoutVM = require('./middle-wares/handleLayout');
var body_parser = require('body-parser');
var path = require('path');


var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

var app = express();

app.engine('hbs', handlebars({
    defaultLayout:'main',
    layoutsDir:'views/layouts/',
    helpers:{
        section:handlebars_sections(),
        number_format: n => {
            var nf = wnumb({
                thousand: ','
            });
            return nf.to(n);
        }
    }
}));          
app.set('view engine', 'hbs');

app.use(express.static(path.resolve(__dirname,'public')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: false
}));

var sessionStore = new MySQLStore({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'camera',
    schema: {
        tableName: 'sessions',
        columnNames: {
            session_id: 'session_id',
            expires: 'expires',
            data: 'data'
        }
    }
});

app.use(session({
    key: 'session_cookie_name',
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));
app.use(handleLayoutVM);
app.use('/',homeController);
app.use('/category',categoryController);
app.use('/manufacture',manufactureController);
app.use('/register',registerController);
app.use('/login',loginController);
app.use('/search',searchController);
app.use('/account', accountController);
app.use('/product',productController);
app.listen(3000,(err)=>{
    if(err) throw err;
    console.log('server is running at port 3000');
});