const Sequelize = require("sequelize");
const db = require("../db");

class Favoritos extends Sequelize.Model {}

Favoritos.init(
  {
    title: {
      type: Sequelize.STRING,
      allowNull:false
    },
    path: {
      type: Sequelize.STRING,
    },
    movieId: {
      type: Sequelize.INTEGER,
      allowNull:false
    },
    overview:{
      type:Sequelize.TEXT
    }
  },
  { sequelize: db, modelName: "favorites" }
);

module.exports = Favoritos;
