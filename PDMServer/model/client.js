/**
 * Created by epi on 4/12/16.
 */

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
var buffer  =  new Array();

var DueBuffer = require('./dueBuffer');
var buffers = {};

client.on('connect',function(){
    console.log("Mqtt client is connected !!");
    client.subscribe('/down/+/+'); //subscribe to all apps and all ports
    client.subscribe('/down/+/+/+'); //subscribe to all apps and all ports and all dues
});

client.on('message',function(topic,message,packet){
    console.log("message recieved!");
    console.log(topic);
    for (key in buffers){
        var d = buffers[key];
        d.addMessage(topic, message);
    }
});

client.addDuetoBuffer =  function(dueid,appid,callback){
    buffer[dueid] = new Array();
    for (key in buffer){
        console.log(key+"::"+buffer[key]);
    }
    console.log("Buffer for Due "+ dueid+"created" );
    callback();
};

client.printBuffer =  function(){
    for (key in buffer){
        console.log(key+"::"+buffer[key].toString());
    }
};

client.getMessagesForDueId = function(dueId, callback){
    var b = buffers[dueId];
    if(b !== undefined){
        b.getAndClearBuffer(function(messages){
            callback(messages);
        });
    } else {
        callback([]);
    }
};

client.addBufferForDue = function(dueId, appId, callback){
    var b = new DueBuffer(dueId, appId);
    buffers[dueId] = b;
    callback(b);
};

client.publishUpdate = function(dueId, appId){
    var up = {dueId: dueId, appId: appId};
    client.publish('/update', JSON.stringify(up)); // send ping for due id
}

module.exports = client;
