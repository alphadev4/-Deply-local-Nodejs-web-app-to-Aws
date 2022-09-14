const express=require('express');
const router=express.Router({
    mergeParams:true
}

);
const {ensureAuthenticated}=require('../auth')
//WELCOME PAGE
router.get('/',(req,res)=>{res.render('welcome')});

//DASHBOARD PAGE
router.get('/dashboard',(req,res)=>{
    res.render('dashboard',{user:req.user});
   
})
module.exports=router;