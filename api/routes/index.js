const express = require("express");
const routes = express.Router();
const user = require("./user");
const favorite = require("./favorite");

routes.use("/users", user);
routes.use('/favorites',favorite)
routes.get("/", (req, res, next) => {
  res.send("SIRVE");
});

module.exports = routes;
