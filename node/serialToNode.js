var SerialPort = require('serialport');

const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8000});

var serialAddress1 = '/dev/ttyACM0';
var serialAddress2 = '/dev/ttyACM1';
var serialAddress3 = '/dev/ttyS0';
var serialAddress4 = '/dev/ttyS1';
var serialAddress5 = '/dev/cu.usbmodem1411'; // macOS

var port = new SerialPort(serialAddress5, {
    baudRate: 115200
});

var decodedData = '';
var buffer = 'quat\t0.01\t0.03\t0.05\t1.00\r\n';
var data = '';

// Broadcast to all.
wss.broadcast = function broadcast(data) {
    wss.clients.forEach(function each(client) {
        if (client.readyState === WebSocket.OPEN) {
            client.send(data);
        }
    });
};

port.on('data', data => {
    decodedData = data.toString('ascii');
    if(decodedData.charAt(0) === 'Q') {
        data = buffer;
        buffer = '';
        buffer = decodedData;

        var dataArray = data.split('\t');
        var fourthDatum = dataArray[4];
        dataArray[4] = fourthDatum.trim();
        dataArray.shift();
        var organizedData = dataArray.join(',');

        wss.broadcast(organizedData);

    } else {
        buffer += decodedData;
    }
});
