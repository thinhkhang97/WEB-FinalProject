var express = require('express');
var handlebars = require('express-handlebars');
var handlebars_sections = require('express-handlebars-sections');
var homeController = require('./controller/homeController');
var categoryController = require('./controller/categoryController');
var manufactureController = require('./controller/manufactureController');
var body_parser = require('body-parser');
var path = require('path');

var app = express();

app.engine('hbs', handlebars({
    defaultLayout:'main',
    layoutsDir:'views/layouts/',
    helpers:{
        section:handlebars_sections()
    }
}));          
app.set('view engine', 'hbs');

app.use(express.static(path.resolve(__dirname,'public')));
app.use(body_parser.json());
app.use(body_parser.urlencoded({
    extended: false
}));

app.use('/',homeController);
app.use('/category',categoryController);
app.use('/manufacture',manufactureController);
app.listen(3000,(err)=>{
    if(err) throw err;
    console.log('server is running at port 3000');
});