# welcome-project

This is the project that I will be presenting on August 30th for club fair.

## abstract

This project is simply using ATmega32u4 and a bluetooth LE (BLE) moduleto receive information from iPhone's gyroscope for the quaternion. Then, using serial connection to feed Node.js to create a server that updates iPhone's position. A client side app will use the data to control a webGL cube.

## current status

<b>8/25/2017</b> - I finished setting up the client side. Try to run  
```{r}
test-three.html
```
and it should be working with a draggable box. It is also controlable now by using console in your favorite web browser. Please type
```{r}
inputQuaternion("[your x],[your y],[your z],[your w]")
```
then it will change to the position you requested (notice there is no space after each comma).

<b>8/26/2017</b> - I finished setting up the server side. Now the server needs to get data from serial port (115200). For now, the server spits out random quaternion data to the client through a websocket. If you want to try it out, go to the folder that contains file
``` {r}
webSocketStream
```
And type command at console
``` {r}
nodejs webSocketStream.js
```
This should be good to set up the server (on localhost). If you use the older version of node.js, try
``` {r}
node webSocketStream.js
```

Then you can click on the page <b>test-three.html</b>, and it should have an iPhone spinning around like crazy.

### feel free to change anything if you think it looks bad, or if you are able to help out, please contact me.
