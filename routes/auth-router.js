const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');

const UserModel = require('../models/user-model.js');

const router = express.Router();

router.get('/signup', (req, res, next) => {
  if(req.user) {
    res.redirect('/');
    return;
  }
  res.locals.bodyClass = 'home-body';
  res.render('auth-views/signup-form.ejs');
});

router.post('/process-signup', (req, res, next) => {
// if either email or password are blank ALERT
  if(req.body.signupName === "" || req.body.signupEmail === "" || req.body.signupPassword === "") {
    res.locals.feedbackkMessage = "We need name, email and password.";
    res.render('auth-views/signup-form.ejs');
    return;
  }

  UserModel.findOne(
    {
      email: req.body.signupEmail
    },

    (err, userFromDb) => {
      if(err){
        next(err);
        return;
      }

      if(userFromDb){
        res.locals.feedbackkMessage = 'Email taken';
        res.render('auth-views/signup-form.ejs');
        return;
      }

      const salt= bcrypt.genSaltSync(10);
      const scrambledPass= bcrypt.hashSync(req.body.signupPassword, salt);

      const theUser = new UserModel({
        name: req.body.signupName,
        email: req.body.signupEmail,
        encryptedPassword: scrambledPass
      });

      theUser.save((err) => {
        if(err) {
          next(err);
          return;
        }

        req.login(theUser, (err) => {
          if (err) {
            next(err);
            return;
          }

          res.redirect('/user-topics');
        });
      });

    }
  );

});

router.get('/login', (req, res, next) => {
  if(req.user) {
    res.redirect('/');
    return;
  }

res.locals.bodyClass = 'home-body';
res.render('auth-views/login-form.ejs');

});

router.post('/process-login',
  passport.authenticate('local', {
    successRedirect: '/user-topics',
    failureRedirect: '/login',
  })
);

router.get('/logout', (req, res, next) => {
  req.logout();

  res.redirect('/');
});


module.exports = router;
