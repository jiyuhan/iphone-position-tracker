/**************** DISCLAIMER *************************
 * the original code is from the internet:
 * https://jsfiddle.net/MadLittleMods/n6u6asza/
 * There are over 50% of the code is changed regarding
 * functionality and style. The author of this project
 * shall not be held responsible for any legal
 * circumstances.       @Thomas Han
 *****************************************************/

var three = THREE;
var scene = new three.Scene();
const WIDTH = 800;
const HEIGHT = 800;
var camera = new three.PerspectiveCamera(40, WIDTH/HEIGHT, 0.1, 1000);

var renderer = new three.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);

/* which container do you want it to go to? */
document.getElementById("potential-cool-stuff").appendChild(renderer.domElement);

/* the cube is here! */
var geometry = new three.BoxGeometry(1, 2, 0.1);

/* loading texture mappings */
three.ImageUtils.crossOrigin = '';
var texture_front = three.ImageUtils.loadTexture('res/iphone_front.jpg');
var texture_back = three.ImageUtils.loadTexture('res/iphone_back.jpg');
var texture_side = three.ImageUtils.loadTexture('res/iphone_side.jpg');
texture_front.anisotropy = renderer.getMaxAnisotropy();
texture_back.anisotropy = renderer.getMaxAnisotropy();
texture_side.anisotropy = renderer.getMaxAnisotropy();

/* attaching texture mappings */
var material = new three.MeshFaceMaterial([
    // side
    new three.MeshBasicMaterial({
        map: texture_side
    }),
    // side
    new three.MeshBasicMaterial({
        map: texture_side
    }),
    // side
    new three.MeshBasicMaterial({
        //color: 0x0000ff,
        map: texture_side
    }),
    // side
    new three.MeshBasicMaterial({
        map: texture_side
    }),
    // front
    new three.MeshBasicMaterial({
        map: texture_front
    }),

    // front
    new three.MeshBasicMaterial({
        map: texture_back
    })
]);

/* the cube is built, assign to an object */
var cube = new three.Mesh(geometry, material);

// set initial position for the cube
// cube.rotation.x = Math.PI/4;
// cube.rotation.y = Math.PI/4;
// cube.rotation.z = -0.5;

/* adding the cube */
scene.add(cube);

camera.position.z = 5;

/* a callback function for server side in order to update the object's position
 * invoked by having a in stream with something like inputQuaternion("0.0, 0.0, 0.0, 1")
 * <i>update: this function is not a callback function anymore. The basic functionality
 * is still the same.</i>
 */
var inputQuaternion = function(input) {

	/* splits data into x, y, z, w */
    var incomingQuaternionData = input.split(',');

    for(var i = 0; i < 4; i++) {
      incomingQuaternionData[i] = incomingQuaternionData[i] * 10 / 10;
      // console.log(incomingQuaternionData[i]);
    }

    var quaternionData = new three.Quaternion().set(incomingQuaternionData[0], incomingQuaternionData[1], incomingQuaternionData[2], incomingQuaternionData[3]);

    var eulerData = new three.Euler().setFromQuaternion(quaternionData);

    cube.rotation.x = eulerData.x;
    cube.rotation.y = eulerData.y;
    cube.rotation.z = eulerData.z;

    // cube.quaternion.multiplyQuaternions(deltaRotationQuaternion, cube.quaternion);


    /* this is for testing purpose, it writes the rotation data on the webpage */
    $("#rotation-data").html("x: " + cube.rotation.x + "<br>y: " + cube.rotation.y + "<br>z: " + cube.rotation.z);
}

//First test for the browsers support for WebSockets
if (!window.WebSocket) {
    //If the user's browser does not support WebSockets, give an alert message
    alert("Your browser does not support the WebSocket API!");
} else {
    var socket = new WebSocket("ws://127.0.0.1:8000/");
    socket.onmessage = event => {
        console.log(event.data);
        inputQuaternion(event.data);
        socket.send("ready");
    }
}

window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function(callback) {
            window.setTimeout(callback, 1000 / 60);
        };
})();

var lastFrameTime = new Date().getTime() / 1000;
var totalGameTime = 0;
function update(dt, t) {
    setTimeout(function() {
        var currTime = new Date().getTime() / 1000;
        var dt = currTime - (lastFrameTime || currTime);
        totalGameTime += dt;

        update(dt, totalGameTime);

        lastFrameTime = currTime;
    }, 0);
}

/* helper function to requset update and render */
function render() {
    renderer.render(scene, camera);
    requestAnimFrame(render);
}

render();
update(0, totalGameTime);

/* helper func */
function toRadians(angle) {
	return angle * (Math.PI / 180);
}

/* helper func */
function toDegrees(angle) {
	return angle * (180 / Math.PI);
}
