// Authors: Shane 22023356, Will 26000121

var five = require("johnny-five"); // import johnny-five


// for creating server 
var app = require("express")();    // imports express libary and creates an instance 
var http = require('http').Server(app);    // imports http 
var io = require("socket.io")(http);    // imports socket.io and creates an instance 


app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/index.html');   // pathway to html file
});
  

var startTime;    // logs start time
var endTime;      // logs end time
var duration;     // stores total motion time 
var motionN = 0;  // number of motions 
var longMotion = 0;     // records long motions
var shortMotion = 0;    // records short motions
var ledOn = false;
var motionOn = false;

var board = new five.Board();    // creates board instance

board.on("ready",function() {
    var motion = new five.Motion(3);    // motion package 
    var led = new five.Led(13);    // sets led
    console.log('Arduino connected');

    motion.on("calibrated", function() {    // calibrates sensor
        //console.log("calibrated");
    },10000);

io.on('connection', function(socket){    // socket.io function connects server functions to client
    
    // motion switch
    socket.on('ms', function(data){    // waits for signal from client to turn motion on
        if (data.motionState == true){
            motionOn = true;
        } else if (data.motionState == false) {
            motionOn = false;
        };
    });

    // led switch
    socket.on('led', function(data){    // waits for signal from client to turn led on
        if (data.ledState == true) {
            led.on();
        } else if (data.ledState == false) {
            led.off();
        };
    });

    // detects when motion starts
    motion.on("motionstart", function() {
        if (motionOn == true){    // checks if motion sensor should read data
            startTime = Date.now();    // records start time of motion 
            //console.log("motionstart");    // for testing  
        };
        console.log("motionstart");
    });

    // detects end of motion    
    motion.on("motionend", function() {
        if (motionOn == true) {    // checks if motion sensor should read data
            endTime = Date.now();    // records end of a motion
            
            //console.log(motionN);    // prints total number of motions for testing          
            duration = (endTime - startTime) /1000;    // calculates duration of a motion
            motionN ++;    // increments total number of motions
            io.sockets.emit('motion',{motionNum: motionN});    // sends total number of motions to client
            if (duration >= 5) {    // determines whether it is a short or long motion
                console.log("long motion" + duration);    // prints time of motion to console
                longMotion ++;    // imcrements long motion   
                io.sockets.emit('longM',{ descriptionLong: longMotion});    // sends long motion data to client
            } else {
                console.log("short motion" + duration);     
                shortMotion ++;    // increments short motion
                io.sockets.emit('shortM',{ descriptionShort: shortMotion});    // send short motion data to client
            };   
        };
        console.log("motionend");

    });

});

http.listen(3000, function(){ 
    console.log('Server available at http://localhost:3000')
});
});
