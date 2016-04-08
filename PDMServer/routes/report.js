var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/fidelity', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
  var ans = {
      PID:'123',
      APPID:'A123',
      data:'{' +
            'wifi:1,'+
            'radio:12,'+
            '}'
  }
  // res.send(JSON.stringify({ a:1}));
  res.send(JSON.stringify(ans));
});

module.exports = router;
