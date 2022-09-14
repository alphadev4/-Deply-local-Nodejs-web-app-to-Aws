const {Sequelize,DataTypes}=require('sequelize');
const sequelize=new Sequelize('postgres','postgres','fastabc123',{
    host:'database-1.cscif9l5pu36.us-east-1.rds.amazonaws.com',
    dialect:'postgres',
   logging: false,

    pool:{
        max:5, 
        min:0,
        acquire:30000,
        idle:10000
    },
});
const db={};
db.Sequelize=Sequelize;
db.sequelize=sequelize;
db.users=require('../model/Users')(sequelize,DataTypes)
db.userPosts=require('../model/UserPosts')(sequelize,DataTypes)

db.sequelize.sync({force:false}).then(()=>{
    console.log('Synced successful')
}).catch((err)=>{
    console.log('Sync unsuccessful')
})

sequelize.authenticate()
.then(()=>{console.log('Connected to postgres')})
.catch((err)=>{console.log('Error is '+err)})


db.sequelize.models.users.hasMany(db.sequelize.models.userPosts,{
        foreignKey:'user_id',
        as:'userPosts',
        sourceKey:''
    })

db.sequelize.models.userPosts.belongsTo(db.sequelize.models.users,{
    foreignKey:'user_id',
    as:'users'
})
//1 TO MANY RELATION
// db.users.hasMany(db.userPosts,{
//     foreignKey:'user_id',
//     as:'userPosts'
// })

// db.userPosts.belongsTo(db.users,{
//     foreignKey:'user_id',
//     as:'users'
// })
module.exports=db;