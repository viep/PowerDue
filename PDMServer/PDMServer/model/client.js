/**
 * Created by epi on 4/12/16.
 */

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
var buffer  =  new Array();

client.on('connect',function(){

    console.log("Mqtt client is connected !!");
});

client.on('message',function(topic,message,packet){
    console.log("message recieved!"+message);
    console.log(topic);
    var values =  topic.split('/');
    var dueid = values[4];
    var appid = values[2];
    var portid = values[3];

    // var mid = "message"+buffer[dueid].length;
    // console.log(mid);
    // console.log(data);
    // var mar = new Array([]);
    // var msg = "["++","++"]";
    buffer[dueid].push([portid,message.toString()]);
    // console.log(packet);


    client.printBuffer();

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

client.getmessagesForDueId = function(dueid,callback){

    console.log(dueid);
    var message = {
        "msg":buffer[dueid]
    };
    buffer[dueid] = [];
    client.printBuffer();
    callback(message);
};

module.exports = client;
