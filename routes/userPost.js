
const express=require('express');
const router=express.Router({
    mergeParams:true
}

);const controllers=require('../controllers/userPostController')
var bodyParser=require('body-parser');
var urlencodedParser= bodyParser.urlencoded({extended:false}); 
//userPosts
router.get('/users/posts',controllers.getPostsByID);
router.post('/users/posts',controllers.addUserPost);
router.delete('/users/posts',controllers.deletePost)

//publishedPosts
router.get('/users/publishedPosts',controllers.getPublishedPosts)

//DraftsPosts
router.get('/users/drafts',controllers.seeDraftPosts)

module.exports=router