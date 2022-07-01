var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

var dotenv = require('dotenv');
dotenv.config({ path: "../.env" });


const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.TWILIO_SENDGRID_API_KEY)

router.route('/register')
  .get(async (req, res) => {
    res.render('signup', { title: 'CrackJack - Sign up' });
  })
  .post(async (req, res) => {
    var newUser = new User({
      email: req.body.email,
      regno: req.body.regno,
      name: req.body.name,
      contact: req.body.contact,
    });

    await newUser.save();
    newUser.setPassword(req.body.password);
    newUser.save(function (err) {
      if (err) {
        res.render('register', { errorMessages: err });
      } else {
        res.redirect('/login');
      }
    })
  });


router.route('/login')
  .get(async (req, res) => {
    res.render('login', { title: "CrackJack - Login" })
  })
  .post(passport.authenticate('local', {
    failureRedirect: '/login'
  }), async (req, res) => {
    var user = await User.findOne({email : req.body.email});
    var otp = user.otp;
    if(otp != req.body.otp) {
      res.redirect('/logout');
    }
    else {
      res.redirect('/');
    }
  });


router.get('/getotp/:email', async (req, res) => {
  const randNum = Math.floor((Math.random() * 100000) + 10000);
  const msg = {
    to: req.params.email,
    from: 'help.vitdost@gmail.com',
    subject: 'OTP - Please do not share with anyone',
    html: `<h1>Hello, User!</h1>
  <h4>Your OTP for logging into CrackJack is : </h4>
  <h2>` + randNum + `</h2>
  <h4>Thank You</h4>
  <h4>CrackJack Team</h4>
  `
  }
  sgMail
    .send(msg)
    .then(async () => {
      console.log('Email sent');
      await User.findOneAndUpdate({email : req.params.email}, {otp : randNum});
      res.status(200).json({"message" : "OTP sent"});
    })
    .catch((error) => {
      console.log(error);
    })
});


router.get('/logout', async (req, res) => {
  await User.findOneAndUpdate({email : req.params.email}, {otp : -1});
  req.logout();
  res.redirect('/login');
});

module.exports = router;
