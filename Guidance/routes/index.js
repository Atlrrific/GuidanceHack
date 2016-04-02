var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Guidance HARDHACK', status: ' Waiting for Guidance' });
});

module.exports = router;
