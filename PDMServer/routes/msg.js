/**
 * Created by epi on 3/30/16.
 */

var express = require('express');
var router = express.Router();
var client = require('../model/client');


 

router.post('/:dueid/:appid', function(req, res, next) {
    res.setHeader('Content-Type', 'application/text');
    var messg = req.body;
    messg = JSON.stringify(messg);
    var dueid = req.params.dueid;
    var appid =  req.params.appid;

    // var topic = '/up/'+appid+'/1/'+dueid ;
    var topic = '/down/'+appid+dueid ;
    console.log(topic,messg);

    client.publish(topic,messg,function(err){
        if(err){
            console.log(err);
        }
        
        console.log("Published bitches !!" );
        
       client.getmessagesForDueId(req.params.dueid,function (messages) {

           console.log("back here with : "+ (messages['message0']));

        res.send(messages);
       });
    }
    );

    
});

module.exports = router;