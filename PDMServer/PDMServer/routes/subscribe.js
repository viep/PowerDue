/**
 * Created by epi on 3/30/16.
 */

var express = require('express');
var router = express.Router();
var client = require('../model/client');


router.post('/*', function(req, res, next) {

    res.setHeader('Content-Type', 'application/json');


    var topic = req.url;

    client.subscribe(topic,function(err,granted){

        if(err){
            console.log("Error in subscription");
            res.status(500).send("Failed to Subscribe");
        }
        console.log("Successful subscription"+ JSON.stringify(granted));


            res.status(200).send("Successful subscription"+JSON.stringify(granted));



    });

});

module.exports = router;
