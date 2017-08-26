const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000});

var x = 0.0;
var y = 0.0;
var z = 0.0;

var spinUp = true;

wss.on('connection', function connection(ws) {
    /* data here please */
    ws.send(spinQuaternion());
    ws.on('message', function incoming(message) {
        if(message === "ready") {
            ws.send(spinQuaternion());
        }
    });
});

var data_packet = process.argv[2];//.split(',');

function randomQuaternion() {
    var randomData = '';

    for(var i = 0; i < 3; i++) {
        randomData += (Math.random().toString() + ',');
    }
    randomData += '1';

    return randomData;
}

function spinQuaternion() {
    var spinDataUpdate = '';
    if(spinUp) {
        if(x < 1) {
            x += 0.01;
        } else {
            spinUp = false;
        }
    } else {
        if(x > -1) {
            x -= 0.01;
        } else {
            spinUp = true;
        }
    }

    spinDataUpdate += x + ",0.5,0.5,0.5";

    return spinDataUpdate;
}
