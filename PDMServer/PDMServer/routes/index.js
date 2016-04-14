var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  
  res.render('dashboard', { title: 'Power Due Management System !!',message: 'LPSOC Class of 2016-17' });
});

module.exports = router;
