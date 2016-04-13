/**
 * Created by epi on 4/12/16.
 */

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');


client.on('connect',function(){


    console.log("Mqtt client is connected !!");
});

client.on('message',function(){
    console.log("message recieved!");

})

module.exports = client;
