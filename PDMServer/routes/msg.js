/**
 * Created by epi on 3/30/16.
 */

var express = require('express');
var router = express.Router();
var client = require('../model/client');


router.sendthem = function(dueid,appid,messages,callback){

    for(message in messages){
        var portid = message[0];
        var data = message[1];
        var topic = "/up/"+dueid+"/"+portid+"/"+appid;
        client.publish(topic,data,function(err){
                if(err){
                    console.log(err);
                }

                console.log("Published bitches !!" );


            }
        );
    }
    callback();

};

router.post('/:appid/:port/:dueid', function(req, res, next) {
    res.setHeader('Content-Type', 'application/text');
    var messg = req.body;
    var messages =  messg["msg"];
    var dueid = req.params.dueid;
    var appid =  req.params.appid;

    // var topic = '/up/'+appid+'/1/'+dueid ;
    // var topic = '/down/'+appid+dueid ;

    router.sendthem(dueid,appid,messages,function () {

        client.getmessagesForDueId(req.params.dueid,function (mails) {

            console.log("back here with : "+ (mails['message0']));

            res.send(mails);
        });
    })



});

module.exports = router;