var express = require('express');
var router = express.Router();
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log("REQUEST:", req.session);
  res.render('index.ejs');
});

// GET /signup
router.get('/signup', function(req, res, next) {
  res.render('signup', { message: req.flash() });
});

// signUpStrategy function
var signUpStrategy = passport.authenticate('local-signup', {
  successRedirect : '/parks',
  failureRedirect : '/signup',
  failureFlash : true
});

// POST /signup
router.post('/signup', function(req, res, next) {
  return signUpStrategy(req, res, next);
});

// GET /login
router.get('/login', function(req, res, next) {
  res.render('login', { message: req.flash() });
});

// POST /login
router.post('/login', function(req, res, next) {
  var loginProperty = passport.authenticate('local-login', {
    successRedirect : '/profile',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(req, res, next);
});

// GET /logout
router.get('/logout', function(req, res, next) {
  req.logout();
  res.redirect('/');
});

// Restricted page
router.get('/secret', function(req, res, next) {
  if (currentUser) {
    res.render('secret.ejs');
  }
  else {
    res.redirect('/');
  }
});

module.exports = router;

// { title: 'Express' }
