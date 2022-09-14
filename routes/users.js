const express=require('express');
const router=express.Router({
    mergeParams:true
}

);
const controllers = require('../controllers/userController');
const passport=require('passport');


//LOGIN PAGE
router.get('/users/login',(req,res)=>{
    res.status(200);
    console.log('Im here');
    res.render('login')
});
//SIGN UP PAGE
router.get('/users/register',(req,res)=>{res.render('register')})


//REGISTER USER
router.post('/users/register',controllers.addUser);

//LOGIN USER
router.post('/users/login',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/dev/dashboard',
        failureRedirect:'/dev/users/login',
        failureFlash:true
    })(req,res,next);
});


//LOGOUT HANDLE
router.get('/users/logout',(req,res,next)=>{
    req.logout((err)=>
     {
        if (err) { return next(err); }
        req.flash('success_msg','You are logged out');
        res.redirect('/users/login');
    });
})
module.exports=router;