const User = require("./User");
const Favoritos = require("./Favoritos");

Favoritos.belongsToMany(User, { through: "favoriteuser" });

module.exports = { User, Favoritos };
