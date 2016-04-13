/**
 * Created by epi on 3/30/16.
 */

var express = require('express');
var router = express.Router();
var client = require('../model/client');
/*
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');


client.on('connect',function(){
    client.subscribe('/down/abc/+');
    console.log('Subscribed');
    console.log("i ve run already and not waiting for anyone");
});
client.on('message',function(topic,message){
    buffer.push(message.toString());
    console.log("Added to buffer -> messaeg recieved");
    console.log(topic);
});
*/

var buffer= [];
/* GET users listing. */
router.post('/:dueid/:appid', function(req, res, next) {
    res.setHeader('Content-Type', 'application/json');
    var messg = req.body;
    messg = JSON.stringify(messg);
    var dueid = req.params.dueid;
    var appid =  req.params.appid;

    // var topic = '/up/'+appid+'/1/'+dueid ;
    var topic = '/down/'+appid+dueid ;
    console.log(topic,messg);

    client.publish(topic,messg,function(err,dueid){
        if(err){
            console.log(err);
        }
        console.log("Published bitches !!");
        

        res.send(JSON.stringify(buffer));
        buffer =[];
    }
    );

    // res.send(JSON.stringify({ a:1}));

    //res.status(200).json(ans);
});

module.exports = router;