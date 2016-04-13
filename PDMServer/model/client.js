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
    // var values =  topic.split('/');
    // var dueid = values[3];
    // var appid = values[2];
    // var mid = "message"+buffer[dueid].length;
    // console.log(mid);
    // // console.log(data);
    // buffer[dueid].push(mid , message);
    // // console.log(packet);
    // console.log("message"+message);

    // client.printBuffer();

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

// client.getmessagesForDueId = function(dueid,callback){
//     console.log(dueid);
//     var message =  buffer[dueid];
//     buffer[dueid] = [];
//     client.printBuffer();
//     callback(message);
// };

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

module.exports = client;
