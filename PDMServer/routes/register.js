var express = require('express');
var router = express.Router();

var client = require('../model/client');


router.post('/:appid/:dueid', function(req, res, next) {
  res.setHeader('Content-Type', 'application/json');
    var dueid =  req.params.dueid;
    var appid =  req.params.appid;
   // var portid =  req.params.portid;
    // var topic= '/down/'+appid+'/'+portid+"/"+dueid;
    
    client.registerDueunderApp(appid,dueid,function(){

        var topic1 = '/down/'+appid+"/+";
        var topic2 = topic1+"/+";
        client.subscribe(topic1,function(err,granted){

            if(err){
                console.log("Error in subscription");
                res.status(500).send("Failed to Subscribe");
            }
            console.log("Successful subscription"+ JSON.stringify(granted));
    });
        client.subscribe(topic2,function(err,granted){

            if(err){
                console.log("Error in subscription");
                res.status(500).send("Failed to Subscribe");
            }
            console.log("Successful subscription"+ JSON.stringify(granted));
            client.addDuetoBuffer(req.params.dueid,req.params.appid,function(err){

                res.status(200).send("Successful subscription"+JSON.stringify(granted));
            })
        });



    });
    /*client.subscribe(topic,function(err,granted){

        if(err){
            console.log("Error in subscription");
            res.status(500).send("Failed to Subscribe");
        }
        console.log("Successful subscription"+ JSON.stringify(granted));
        client.addDuetoBuffer(req.params.dueid,req.params.appid,function(err){
           
            res.status(200).send("Successful subscription"+JSON.stringify(granted));
        })
        

    });*/

  // res.send(JSON.stringify(ans));
  // res.send(JSON.stringify(ans));
});

module.exports = router;
