/**
 * dueBuffer.js
 * Created by cef on 04/13/2016
 */

 function DueBuffer(dueId, appId){
 	this.dueId = dueId;
 	this.appId = appId;
 	this.messageBuffer = [];
 }

 DueBuffer.prototype.getAndClearBuffer = function(next){
 	next(this.messageBuffer);
 	this.messageBuffer = [];
 };

 DueBuffer.prototype.addMessage = function(topic, message){
 	// determine if topic is appropriate for this due
 	var parts = topic.split('/');
 	var validTopic = true;
 	console.log("topic parts: " + parts);
 	console.log(this.appId, parts[2]);
 	if(parts.length > 4){ // has dueId and appId
 		// check if both appId and dueId are the same
 		// console.log(this.dueId, parts[4], this.appId, parts[2]);
 		validTopic = (parts[4] == this.dueId) && (parts[2] == this.appId);
 	} else { // has appId only
 		// check if appId is same
 		// console.log(this.appId, parts[2]);
 		validTopic = (parts[2] == this.appId); 
 	}
 	console.log("validTopic: " + validTopic);
 	if(validTopic){
 		// get port
 		var port = parseInt(parts[3]);
 		var msg = [port,message.toString()];
 		console.log("message: " + JSON.stringify(msg));
 		this.messageBuffer.push(msg);
 	}
 }

 module.exports = DueBuffer;