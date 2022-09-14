const {Sequelize,Op} = require('sequelize');
const db =require('../database/database')

//const UserPosts=db.sequelize.model.userPosts
const UserPosts=db.sequelize.models.userPosts

var addUserPost=async(req,res)=>{
    try
    {
       res.status(200).json({"message":"success"});
        console.log(user_ID);
        let info={
            title:req.body.title,
            content:req.body.content,
            published:req.body.published?req.body.published:false,
            user_id:user_ID
        }

        const userPost=await UserPosts.create(info);
        
        
    }
    catch(e)
    {
        return res.status(500).send(e.message);

    }

}

//Get All Posts 
const getAllPosts=async(req,res)=>{
        
        let userPost=await UserPosts.findAll({})
        //console.log(userPost)

       return res.render('publishedposts',{data:userPost})
    
}

//Get Products by ID
const getPostsByID=async(req,res)=>{
    let id=user_ID
    
    let userPost =await UserPosts.findAll({
        where:{
            user_id:id
        }
    })
    return res.render('userposts',{data:userPost})
}

//Update Post
const updatePost=async(req,res)=>{
    let id=req.params.id
    const userPost=await UserPosts.update(req.body,{where:{id:id}})
    res.status(200).send(userPost);
}

//Published Posts
const getPublishedPosts=async(req,res)=>{
    const userPost=await UserPosts.findAll({where:{published:true}})
    return res.render('publishedposts',{data:userPost})

}

const seeDraftPosts=async(req,res)=>{
    let id=user_ID;
    const userPost=await UserPosts.findAll({where:{[Op.and]:[{published:false},{user_id:id}]}})
    console.log(userPost);
    return res.render('drafts',{data:userPost})
}

const deletePost=async(req,res)=>{
    let id=user_ID
    let data=await Users.destroy({
          where:{
           user_id:id
          }
        })
        return res.render('userposts')
      
}

module.exports={
    addUserPost,
    getAllPosts,
    getPostsByID,
    updatePost,
    getPublishedPosts,
    seeDraftPosts,
    deletePost
}