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

There are two files: motion.js (acts as a server) and control.html (acts as a client).

The program requires the following packages:
	- johnny-five
	- express
	- socket io

To install the mentioned packages:
	- Open console (command prompt).
	- Use the following line: "npm install johnny-five express socket io".

The server is hosted on localhost:3000. Type in the web browser: http://localhost:3000, as opening the html file directly
does not enable the program to work. 
