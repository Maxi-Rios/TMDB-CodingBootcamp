const express = require("express");
const { Favoritos, User } = require("../models");
const favorite = express.Router();

favorite.get("/:id", (req, res) => {
  const id = req.params.id;
  Favoritos.findAll({ include: { model: User, where: { id } } }).then(
    (favorites) => res.status(200).send(favorites)
  );
});

favorite.put("/", (req, res) => {
  const { userId, movieId } = req.body;
  Favoritos.findOne({ where: { movieId } }).then((fav) => {
    if (fav) return null;
    Favoritos.create(req.body).then((favorito) => {
      User.findByPk(userId)
        .then((user) => favorito.addUser(user))
        .then(() => res.sendStatus(202))
        .catch((error) => console.log(error));
    });
  });
});

favorite.delete("/delete", (req, res) => {
  const { movieId } = req.body;
  Favoritos.destroy({ where: { movieId } })
    .then(() => res.sendStatus(200))
    .catch((err) => res.status(500).send(err));
});

module.exports = favorite;
