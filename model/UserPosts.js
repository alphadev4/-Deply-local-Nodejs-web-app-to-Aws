const sequelize = require("sequelize");

module.exports=(sequelize,DataTypes)=>{
    const userPosts=sequelize.define('userPosts',{
        title:{
        type:DataTypes.STRING,
        allowNull:false},
       
        content:{
           type:DataTypes.TEXT,
           allowNull:false},
        published:{
            type:DataTypes.BOOLEAN
        },
       
      
    })
}

