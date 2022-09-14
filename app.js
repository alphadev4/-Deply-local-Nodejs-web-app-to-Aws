var express=require('express');
const expressLayouts=require('express-ejs-layouts');
const bodyParser=require('body-parser');
const flash=require('connect-flash')
const session=require('express-session');
const passport = require('passport');
var app=express();
var models = require("./model/Users");
var models = require("./model/UserPosts");
//DATABASE
require('./database/database',models.user)
require('./database/database',models.userPosts)
require('./passport')(passport);


//BODY PARSER
app.use(express.urlencoded({extended:false}))

//EXPRESS SESSION MIDDLEWARE
app.use(session({
    secret:'secret',
    resave:true,
    saveUninitialized:true,
}))

//LOAD PASSPORT STRATEGIES
app.use(passport.initialize());
app.use(passport.session());

//CONNECT FLASH
app.use(flash());


//GLOBAL VARS
app.use((req,res,next)=>{
    res.locals.success_msg=req.flash('SUCCESS_MSG')
    res.locals.error_msg=req.flash('ERROR_MSG')
    res.locals.error=req.flash('error');
    next();

});

app.use((req,res,next)=>{
    res.locals.user_ID;
    next();
})
//EJS
app.use(expressLayouts);
app.set('view engine','ejs')

//ROUTES
app.use('/',require('./routes/index'));
app.use('/',require('./routes/users'));
app.use('/',require('./routes/userPost'));


module.exports = app


//require('./database/database')
