/**
 * Created by epi on 3/30/16.
 */

var express = require('express');
var router = express.Router();
var client = require('../model/client');

router.post('/*', function(req, res, next) {

    var topic = req.url.toString();
    console.log(topic);
    console.log("Publishing to following topic :" + topic);


    var data = req.body.toString();


    client.publish(topic,data,function(err){
            if(err){
                console.log(err);
            }

            console.log("Published bitches !!"  );

            // res.setHeader('Content-Type', 'application/json');
            res.status(200).send("OK");

    });

});

module.exports = router;
