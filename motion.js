// packages
var five = require("johnny-five"); // import johnny-five


// 
var app = require("express")(); // express library
var http = require('http').Server(app);
var io = require("socket.io")(http);


app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/client.html');
});
 
 



var startTime;
var endTime;
var duration;
var longMotion = 0 ;
var shortMotion = 0;


var board = new five.Board(); // creates board object

board.on("ready",function() {
	var motion = new five.Motion(3); // motion package 
	var led = new five.Led(13); // sets led
	console.log('Arduino connected');

	motion.on("calibrated", function() {
		//console.log("calibrated");
	});

io.on('connection', function(socket){
	motion.on("motionstart", function() {
    	startTime = Date.now();
    	//console.log("motionstart");
    	led.on();    	
  	});


  	motion.on("motionend", function() {
    	endTime = Date.now();
    	led.off();
    	//console.log("motionend");     	
    	duration = (endTime - startTime) /1000 ;
    	if (duration > 4) {
    		console.log("long motion" + duration);
            longMotion ++;	
            io.socket.emit('broadcast',{ description: longMotion + 'long motion'});
    	} else {
    		console.log("short motion" + duration);
            shortMotion ++;
    	}
    	
    	
  	});
    });

});

http.listen(3000, function(){; 
console.log('Server available at http://localhost:3000' );
});  