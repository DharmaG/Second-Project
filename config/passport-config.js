const passport = require('passport');
const UserModel = require('../models/user-model.js');

// what gets saved when you are logged in
passport.serializeUser((userFromDb, done) => {
  done(null, userFromDb._id);

});


//tells passport how to get the user's information
passport.deserializeUser((idFromDb, done) => {
  UserModel.findById(
    idFromDb,

    (err, userFromDb) => {
      if(err) {
        done(err);
        return;
      }

      done(null, userFromDb);

    }
  );
});

// STRATEGIES SETUP

const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'loginEmail',
      passwordField: 'loginPassword'
    },

    (emailValue, passValue, done) => {
      UserModel.findOne(
        {email: emailValue},
        (err, userFromDb) => {
          if(err) {
            done(err);
            return;
          }

          if(userFromDb === null) {
            done(null,false, {message: 'Wrong email!!'});
            return;
          }

          const isGoodPassword = bcrypt.compareSync(passValue, userFromDb. encryptedPassword);

              if (isGoodPassword === false) {
              done(null, false, { message: 'Wrong password. 💩' });
              return;
              }

                done(null, userFromDb);
        }
      );
    }
  )
);
