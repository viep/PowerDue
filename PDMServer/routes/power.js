/**
 * Created by epi on 3/30/16.
 */

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
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
    res.status(200).json(ans);
});

router.post('/:pid', function(req, res, next) {
    console.log("i reached here")
    res.setHeader('Content-Type', 'application/json');
    var data = req.body;
    console.log(req.params.pid);
    // res.send(JSON.stringify({ a:1}));
    res.status(200).json(data);
});

module.exports = router;
