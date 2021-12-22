const passport = require("passport");
const LocalStrategy = require("passport-local");

const database = [{ username: "admin", password: "Admin&8181" }];

passport.use(
  new LocalStrategy(function (username, password, done) {
    console.log(username, password);
    const user = { username: username };

    if (database.some(user => username === user.username && password === user.password)) {
      return done(null, user, { message: "login success" });
    } else {
      return done(null, null, { message: "wrong login info" });
    }
  }),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (user, done) {
  done(null, user);
})

module.exports = passport;
