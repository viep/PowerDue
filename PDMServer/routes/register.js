var express = require('express');
var router = express.Router();

var client = require('../model/client');


router.post('/:appid/:dueid', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
    var dueid =  req.params.dueid;
    var appid =  req.params.appid;
    var topic= '/down/'+appid+'/'+dueid;

    client.subscribe(topic,function(err,granted){

        if(err){
            console.log("Error in subscription");
            res.status(500).send("Failed to Subscribe");
        }
        console.log("Successful subscription"+ JSON.stringify(granted));
        res.status(200).send("Successful subscription"+JSON.stringify(granted));
    });

  // res.send(JSON.stringify(ans));
  // res.send(JSON.stringify(ans));
});

module.exports = router;
