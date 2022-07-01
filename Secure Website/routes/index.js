var express = require('express');
var router = express.Router();

const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 15 minutes
  max: 1,
  message: "Too many accounts created from this IP, please try again after an hour"
});

router.get('/', apiLimiter, async (req, res) => {
  res.render('index', { title: 'CrackJack - Home'});
});

router.get('/error', async (req, res) => {
  res.render('error', { title: "CrackJack"});
})


module.exports = router;
