const express = require("express");
const passport = require("passport/lib");
const { Op } = require("sequelize");
const { User, Favoritos } = require("../models");
const user = express.Router();

user.post("/register", (req, res, next) => {
  console.log(req.body)
  User.create(req.body)
    .then((data) => res.send(data))
    .catch((err) => console.error(err));
});
user.post("/login", passport.authenticate("local"), (req, res) => {
  res.send(req.user);
});

//deslogueo
user.post("/logout", (req, res) => {
  req.logOut(req.user, (err) => {
    if (err) return next(err);
    res.send("Deslogueado");
  });
});

user.get("/:name/:id", (req, res, next) => {
  console.log(req.params.name)
  Favoritos.findAll({
    include: {
      model: User,
      where: { name: req.params.name,
      [Op.not]:[{id:req.params.id}]},
    },
  })
    .then((data) => res.send(data))
    .catch((err) => console.error(err));
});

module.exports = user;
