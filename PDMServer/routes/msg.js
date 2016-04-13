/**
 * Created by epi on 3/30/16.
 */

var express = require('express');
var router = express.Router();
var client = require('../model/client');

router.post('/:dueid/:appid', function(req, res, next) {
    res.setHeader('Content-Type', 'application/text');
    var messg = req.body;
    var dueid = req.params.dueid;
    var appid =  req.params.appid;

    console.log("received: " + JSON.stringify(messg));

    var messages = messg['msg'];
    messages.forEach(function(o){
        var port = o[0]; // first item should be port
        var m = o[1]; // second item should be message string
        var topic = '/up/'+appid+'/'+port+'/'+dueid;
        console.log(topic, m);
        client.publish(topic,m,function(err){
            if(err){
                console.log('Failed to publish message: (' + topic + ')' + err);
            }
        });
    });

    client.getmessagesForDueId(dueid, function(messages) {
        //console.log("back here with : "+ (messages['message0']));
        res.send(JSON.stringify([]));
    });
    
});

module.exports = router;