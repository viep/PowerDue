/**
 * Created by epi on 4/12/16.
 */

var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://localhost');
var buffer  =  new Array();
var ApptoDue = {};

client.on('connect',function(){

    console.log("Mqtt client is connected !!");
});

client.on('message',function(topic,message,packet){
    console.log("message recieved!"+message);
    console.log(topic);
    var values =  topic.split('/');
    for (var x in values){
        console.log(x);
    }
    var dueid = values[4];
    var appid = values[2];
    var portid = values[3];
    console.log("due"+dueid+"ap"+appid+"por"+portid);
    if( dueid){

        buffer[dueid].push([portid,message.toString()]);
    }
    else{
        console.log("send to everyone");

        var listofdues = ApptoDue[appid];
        console.log(listofdues+typeof (listofdues));
        for (due in listofdues){
            console.log(due);
            buffer[listofdues[due]].push([portid,message.toString()]);
        }
    }
    // var mid = "message"+buffer[dueid].length;
    // console.log(mid);
    // console.log(data);
    // var mar = new Array([]);
    // var msg = "["++","++"]";

    // console.log(packet);


    client.printBuffer(buffer);

});

client.addDuetoBuffer =  function(dueid,appid,callback){

    buffer[dueid] = new Array();
    for (key in buffer){
        console.log(key+"::"+buffer[key]);
    }
    console.log("Buffer for Due "+ dueid+"created" );
    callback();
};

client.printBuffer =  function(bf){

    for (key in bf){
        console.log(key+"::"+bf[key].toString());
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

client.registerDueunderApp = function(appid,dueid,callback){



        if( appid in ApptoDue){

            ApptoDue[appid].push(dueid);
        }
        else{

            ApptoDue[appid]= new Array();
            ApptoDue[appid].push(dueid);
    }
    client.printBuffer(ApptoDue);
    callback();
};

module.exports = client;
