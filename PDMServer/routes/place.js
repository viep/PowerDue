/**
 * Created by epi on 3/30/16.
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.post('/:user', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var user = req.body;
    // res.send(JSON.stringify({ a:1}));
    res.send(user)
    //res.status(200).json(ans);
});

module.exports = router;