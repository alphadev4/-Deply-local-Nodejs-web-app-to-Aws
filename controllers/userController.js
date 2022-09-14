const e = require("connect-flash");
const { Sequelize, Op } = require("sequelize");
var db = require("../database/database");

//const Users=db.sequelize.models.users;
const Users = db.sequelize.models.users;

var addUser = async (req, res) => {
  const errors = [];
  try {
    const { name, email, password } = req.body;
    const user = await Users.findOne({where: { email: email },});

    //User with specified id exist
    if (user) { return res.redirect("/users/register");}

    //Create User
    const newuser = await Users.create(req.body);
    console.log(newuser);

    //Redirect to Login Page
    return res.redirect("/dev/users/login");

  } catch (error) {
    console.log("error 500");
    return res.status(500).send(error);
  }
};

var findUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await Users.findOne({
      where: { email: email, password: password },
    });

    if (user) {
      return res.status(200).send("User exits");
    }

    return res.status(200).send("ID OR PASSWORD DOES NOT MATCH");
  } catch (error) {
    return res.status(500).send(error.message);
  }

  //UPDATING
  // let data=await Users.update({email:'newemailofmeerab@gmail.com'},{
  //   where:{
  //     id:2
  //   }
  // })

  //DELETING
  // let data=await Users.destroy({
  //   where:{
  //     id:1
  //   }
  // })

  //TRUNCATE
  // let data=await Users.destroy({
  //   truncate:true
  // })

  //BULK INSERT

  // let data=await Users.bulkCreate([
  //   {name:'first',email:'haha@gmail.com',gender:'no idea'},
  //   {name:'second',email:'haha@gmail.com',gender:'no idea'},
  //   {name:'third',email:'haha@gmail.com',gender:'no idea'}
  // ])

  //FIND ALL AND FIND ONE
  let data = await Users.findOne({});
  let response = {
    data: data,
  };

  res.status(200).json(response);
};

var queryData = async (req, res) => {
  //INCLUDE AND EXCLUDE
  //  let data=await Users.findAll({
  //   attributes:{
  //   exclude:['createdAt','updatedAt'],
  //   include:[[Sequelize.fn('CONCAT',Sequelize.col('name'),'Dear'),'name']]
  // },
  //  })

  //CONDITIONAL OPERATORS
  let data = await Users.findAll({
    where: {
      id: {
        [Op.gt]: 2,
      },
      email: {
        [Op.like]: "%@gmail.com",
      },
    },
    order: [["name", "DESC"]],
  });

  let respone = {
    data: data,
  };

  res.status(200).json(respone);
};

var setterGetter = async (req, res) => {
  let data = await Users.findAll();
  let response = {
    data: data,
  };
  res.status(200).json(response);
};

var validations = async (req, res) => {
  try {
    let data = await Users.create({
      name: "Sana",
      email: "sanayousaf@123gmail.com",
      gender: "male",
    });
  } catch (e) {
    const messages = {};
    e.errors.forEach((error) => {
      let message;
      switch (error.validatorKey) {
        case "not_unique":
          message = "DUPLICATE EMAIL";
          break;
      }
      messages[error.path] = message;
      console.log(messages);
    });
  }

  // let response={
  //   data:data
  // }

  // res.status(200).json(response);
};

module.exports = {
  addUser,
  findUser,
  queryData,
  setterGetter,
  validations,
};
