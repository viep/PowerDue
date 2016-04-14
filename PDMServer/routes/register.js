var express = require('express');
var router = express.Router();

var client = require('../model/client');

router.post('/:dueid/:appid', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
    var dueid =  req.params.dueid;
    var appid =  req.params.appid;
    client.addBufferForDue(dueid, appid, function(buffer){
        console.log("here: ",buffer);
        if(buffer !== undefined){
            res.status(200).send(JSON.stringify({"result": "OK"}));
        } else {
            res.status(500).send(JSON.stringify({"error": "Failed to register"}));
        }
    });
    client.publishUpdate(dueid,appid);
});

module.exports = router;
