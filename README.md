# welcome-project

This is the project that I will be presenting on August 30th for club fair. A testing video can be seen <a href="https://youtu.be/_88heV2FmLk">here</a>.

## abstract

This project is simply using ATmega32u4 and a bluetooth LE (BLE) moduleto receive information from iPhone's gyroscope for the quaternion. Then, using serial connection to feed Node.js to create a server that updates iPhone's position. A client side app will use the data to control a webGL cube.

## how does it work?

This project goes around like this:

iPhone (quaternion data)

⬇️ Bluetooth Low Energy (BLE)

Adafruit 32u4 Feather

⬇️ Serial Comm. (baud rate: 115200)

Node.js server

⬇️ parsed nicely and upload to http://localhost:8000/ (127.0.0.1:8000)

intranet

⬇️ taken by client side, and taken by 3D model

client virtual phone moves.

## how to use it

First step is to start the server side. Run 
```{r}
ls /dev/tty.*
```
to determine which serial port you are using for Adafruit 32u3 Feather. Then change accordingly in ```serialToNode.js```.

Then install dependencies. Type
```{r}
npm install serialport
```
If it fails, try this
```{r}
sudo npm install serialport --unsafe-perm --build-from-source
```
If still doesn't work, reading <a href="https://www.npmjs.com/package/serialport">this</a> might help.

Next step, install ws (websocket).
```{r}
npm install ws
```
this usually should work fine.

After all this, open a terminal and run
```{r}
nodejs serialToNode.js
```
Or if your laptop runs MacOS or maybe older version of node.js, try
```{r}
node serialToNode.js
```

Next, we are to open the client side. Open the file ```index.html``` should do the job. It might not be able to support all the browsers, but FireFox should work.

## web design

More work in web designing would be great, but since my time is limited, so are my web design skills.

@ <a href="https://www.github.com/jiyuhan">Thomas Han</a>
