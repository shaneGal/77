// Authors: Shane 22023356, Will 26000121

// packages
var five = require("johnny-five");    // import johnny-five


var board = new five.Board();    // board intance


board.on("ready",function() {   // board function
	var motion = new five.Motion(3);   // motion instance using pin 3
	var led = new five.Led(13);    // led instance using pin 13


	motion.on("calibrated", function() {    // calitration function 
        console.log("calibrated");
    	});

    motion.on("motionstart", function() {    // motion start detects presence of a motion
    	console.log("motionstart");    // for testing a motion start and end
    	led.on();   // blinks led 
    	led.off();
    	});

    motion.on("motionend", function () {    // motion end detects end of a motion
    	console.log("motioned");    // for testing
    	
    });
    
});