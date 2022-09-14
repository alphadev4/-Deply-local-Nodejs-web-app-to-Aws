module.exports={
    ensureAuthenticated:function(req,res,next){
        if(req.isAuth){
            return next();
        }
        req.flash('error_msg','Please login to view this resources');
        res.redirect('users/login');
    }
    

}