// Configuración del server
const express = require("express");
const app = express();
const routes = require("./routes/index");
const db = require("./db");
const { User, Favoritos } = require("./models");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const passport = require("passport/lib");
const LocalStrategy = require("passport-local").Strategy;
const session = require("express-session");
app.use(express.json());
app.use(cors());

app.use(cookieParser());

app.use(
  session({
    secret: "moviesmaxs",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, done) {
      User.findOne({
        where: { email },
      })
        .then((user) => {
          if (!user) {
            return done(null, false); // user not found
          }
          user.hash(password, user.salt).then((hash) => {
            if (hash !== user.password) {
              return done(null, false); // invalid password
            }
            return done(null, user); // success 😄
          });
        })
        .catch(done);
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.findByPk(id).then((user) => done(null, user));
});

app.use("/api", routes);

db.sync({ force: false }).then(() => {
  app.listen(1337, (req, res, next) => {
    console.log("API on port 1337");
  });
});
