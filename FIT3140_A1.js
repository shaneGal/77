var five = require("johnny-five"); // import johnny-five
var board = new five.Board(); // creates board object

var startTime;
var endTime;
var duration;

board.on("ready",function() {
	var motion = new five.Motion(3); // motion package 
	var led = new five.Led(13); // sets led
	
	motion.on("calibrated", function() {
		//console.log("calibrated");
	});

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
    	} else {
    		console.log("short motion" + duration);
    	}
    	
    	
  	});

});