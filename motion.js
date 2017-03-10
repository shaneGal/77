// packages
var five = require("johnny-five"); // import johnny-five


// for creating server 
var app = require("express")(); // express library
var http = require('http').Server(app);
var io = require("socket.io")(http);


app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/client.html');
});
  

var startTime; // logs start time
var endTime; // logs end time
var duration; // stores total motion time 
var longMotion = 0; // records long motions
var shortMotion = 0; // records short motions
var ledSwitch = true; // 

var board = new five.Board(); // creates board object

board.on("ready",function() {
	var motion = new five.Motion(3); // motion package 
	var led = new five.Led(13); // sets led
	console.log('Arduino connected');

	motion.on("calibrated", function() {
		//console.log("calibrated");
	});

io.on('connection', function(socket){ // need to review this function
	motion.on("motionstart", function() {
    	startTime = Date.now();
    	//console.log("motionstart");
    	if (ledSwitch){ // prevent led from turning on if switched off
            led.on()};    	
  	});


  	motion.on("motionend", function() {
    	endTime = Date.now();
    	led.off();
    	//console.log("motionend");     	
    	duration = (endTime - startTime) /1000 ;
    	if (duration > 4) {
    		console.log("long motion" + duration);
            longMotion ++; 	
            io.sockets.emit('longM',{ descriptionLong: longMotion + 'long motion'}); // adding a delay created too many motions
    	} else {
    		console.log("short motion" + duration);
            shortMotion ++;
            io.sockets.emit('shortM',{ descriptionShort: shortMotion + 'short motion'});
    	}	
  	});
    });

});

http.listen(3000, function(){; 
console.log('Server available at http://localhost:3000' );
});  


function motionoff() {
    
}