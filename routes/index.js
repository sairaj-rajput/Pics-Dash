var express = require('express');
var router = express.Router();
const userModel = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local');

passport.use(new localStrategy(userModel.authenticate()));

/* GET / page. */
router.get('/', function (req, res, next) {
  res.render('index');
});

/* GET register page. */
router.get('/register', function (req, res){
  res.render('register');
});

/* GET profile page. */
router.get('/profile',isLoggedIn ,function (req, res, next) {
  res.render('profile');
});


/* POST methods (for getting form values) */
router.post('/register', function (req, res) {
  var data = new userModel({
    username: req.body.username,
    fullName: req.body.fullame,
    email: req.body.email
  });
  userModel.register(data, req.body.password)
    .then(function () {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/profile");
      })
    })
});

router.post('/login', passport.authenticate("local", {
  failureRedirect: "/",
  successRedirect:"/profile"
}),function (req, res) { 
});

router.get('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
})

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()){
    return next();
  }
  res.redirect("/");
}

module.exports = router;
