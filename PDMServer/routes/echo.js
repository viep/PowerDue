/**
 * Created by epi on 3/31/16.
 */

var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    console.log("event logged")
    res.setHeader('Content-Type', 'application/json');
    //var data = req.body;
    //console.log(req.params.pid);
    // res.send(JSON.stringify({ a:1}));
    res.status(200).send(JSON.stringify(req.body));
});

module.exports = router;
