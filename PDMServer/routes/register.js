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
    client.publish('/update', dueid); // send ping for due id

    // var topic= '/down/'+appid+'/'+dueid;

    // client.subscribe(topic,function(err,granted){

    //     if(err){
    //         console.log("Error in subscription");
    //         res.status(500).send("Failed to Subscribe");
    //     }
    //     console.log("Successful subscription"+ JSON.stringify(granted));
    //     client.addDuetoBuffer(req.params.dueid,req.params.appid,function(err){
           
    //         res.status(200).send("Successful subscription"+JSON.stringify(granted));
    //     })
        

    // });

  // res.send(JSON.stringify(ans));
  // res.send(JSON.stringify(ans));
});

module.exports = router;
