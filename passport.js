const LocalStrategy=require('passport-local').Strategy;
const {Sequelize}=require('sequelize');
var db=require('./database/database')

//const Users=db.sequelize.models.users;
const Users=db.sequelize.models.users;
const controllers=require('./controllers/userController');

const passport = require('passport');

module.exports=function(passport){
 passport.use(
    new LocalStrategy({usernameField:'email'},(email,password,done)=>{
        //MATCH USER
        Users.findOne({where:{email:email}})
        .then(user=>{
            if(!user){
                return done(null,false,{message:'EMAIL NOT REGISTERED'});
            }

            // compare(password,user.password,(err,isMatch)=>{
            //     console.log(password);
            //     console.log(user.password);
            //     if(err) throw err;
            //     if(isMatch){
            //         console.log('password is matched');
            //         return done(null,user);
            //     }
            //     else{
            //         return done(null,false,{message:'Incorrect Password'});
            //     }
            // })

            if(password===user.password)
            {
                user_ID=user.id;
                console.log(user_ID);
                console.log('password is matched');
                return done(null,user);
            }
            else
            {
                return done(null,false,{message:'Incorrect Password'});
            }
            
        }).catch(err=>console.log(err));
    })
 )
};
passport.serializeUser((user,done)=>{
    
    done(null,user.id);
})

passport.deserializeUser(function (id, done) {
    Users.findOne({ where: { id: id } })
    .then((user) => {
      done(null,user);
    });
  });