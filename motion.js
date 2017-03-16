// packages
var five = require("johnny-five"); // import johnny-five


// for creating server 
var app = require("express")(); // express library
var http = require('http').Server(app);
var io = require("socket.io")(http);


app.get('/', function(req, res) {  
        res.sendFile(__dirname + '/control.html');
});
  

var startTime; // logs start time
var endTime; // logs end time
var duration; // stores total motion time 
var motionN = 0; // number of motions 
var longMotion = 0; // records long motions
var shortMotion = 0; // records short motions
var ledOn = true;
var motionOn = true;

var board = new five.Board(); // creates board object

board.on("ready",function() {
    var motion = new five.Motion(3); // motion package 
    var led = new five.Led(13); // sets led
    console.log('Arduino connected');

    motion.on("calibrated", function() {
        //console.log("calibrated");
    });

io.on('connection', function(socket){ // need to review this function
    

    socket.on('ms', function(data){
        if (data.motionState == true){
            motionOn = true;
        } else if (data.motionState == false) {
            motionOn = false;
        };
    });


    socket.on('led', function(data){
        if (data.ledState == true) {
            ledOn = true;
        } else if (data.ledState == false) {
            ledOn = false;
        };
    });
 
    motion.on("motionstart", function() {
        if (motionOn == true){
            startTime = Date.now();
            //console.log("motionstart");
            if (ledOn == true) {
                led.on();
            };      
        };
    });

    
    motion.on("motionend", function() {
        if (motionOn == true) {
            endTime = Date.now();
            led.off();
            console.log(motionN);         
            duration = (endTime - startTime) /1000;
            motionN ++;
            io.sockets.emit('motion',{motionNum: motionN});
            if (duration > 4) {
                console.log("long motion" + duration);
                longMotion ++;  
                io.sockets.emit('longM',{ descriptionLong: longMotion});
            } else {
                console.log("short motion" + duration);
                shortMotion ++;
                io.sockets.emit('shortM',{ descriptionShort: shortMotion});
            };
   
        };

    });

});


http.listen(3000, function(){ 
    console.log('Server available at http://localhost:3000')
});
});