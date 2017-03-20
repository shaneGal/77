This document explains the setup and required libraries to run the program.

To setup the board:
	- With the LED, insert the long end into port 13 and the short end into GND.
	- With the motion sensor, using a wire coonnect:
		- VCC to 5V
		- GND to GND
		- OUT to port 3
	- The Arduino Uno board has a StandardFirmata uploaded. To install:
		1. Download and install the latest Adruino IDE.
		2. Connect the Arduino board to a USB port of your computer.
		3. Open Arduino and go to: File --> Examples --> Firmata and select StandardFirmata.
		4. Verify and upload.



The program requires the following:

Languages:
	- nodejs
	
Packages:
	- johnny-five
	- express
	- socket io

To install the mentioned packages:
	- Open console (command prompt).
	- Use the following line: "npm install johnny-five express socket io".

To compile:
change directory to programs location
      Example: nodejs <filename>

Task 1: 
When a motion is detected the led blinks 

Task 2:
There are two files: motion.js (acts as a server) and control.html (acts as a client). The server processes input data
from the PIR and then sends that information to the client. The client then simply displays the result (number of motions,
number of long motions and number of short motions. A long motion is defined as any motion greater than or equal to 5 seconds and a short any motion less than 5 seconds. The client receives user inputs from the html elements and is emitted
to the server. The server responds accordingly (turn LED/PIR on or off).

The server is hosted on localhost:3000. Type in the web browser: http://localhost:3000, as opening the html file directly
does not enable the program to work.

Issues:
	- html cannot load an external css file when accessing through local host. Solution: put css code into html file.
	- If too many motions are detected unplugged board from the usb port then insert it and restart program 
