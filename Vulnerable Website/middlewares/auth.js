var passport = require('passport');

const Auth = passport.authenticate("cookie", {
  failureRedirect: '/login',
  session: false
});

module.exports = Auth;