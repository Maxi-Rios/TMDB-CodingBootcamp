const Sequelize = require("sequelize");
const db = require("../db");
const bcrypt =require("bcrypt")


class User extends Sequelize.Model {
  hash(passaword,salt){
    return bcrypt.hash(passaword,salt)
  }
}

User.init(
  {
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:Sequelize.STRING,
        allowNull:false
    },
    salt:{
        type:Sequelize.STRING
    }
  },
  {sequelize:db,modelName:"users"}
);
User.beforeCreate((user) => {
  return bcrypt
    .genSalt(16)
    .then((salt) => {
      user.salt = salt;
      return user.hash(user.password, user.salt);
    })
    .then((hash) => {
      user.password = hash;
    });
});

module.exports = User;
