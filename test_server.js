//TCP socket server 
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;


//import functions from 'robotMoves.js' and 'Mars_Robot':
var Move = require('./robotMoves');
var initClass = require('./Mars_Robot');

// Create a server instance with listen function chained to it
// The function passed to net.createServer() becomes the event handler for the 'connection' event
net.createServer(function(sock) {
	
	// There is a connection - a socket object is assigned to the connection 
	console.log('CONNECTED: ' + sock.remoteAddress +':'+ sock.remotePort);
	
	// Add a 'data' event handler to this instance of socket
	sock.on('data', function(data) {
		
		console.log('DATA ' + sock.remoteAddress + ': \n' + data);
		// Write the data back to the socket, the client will receive it as data from the server
		sock.write('Input:\n' + data);

		// Turn data from the client into a string
		var buf = new Buffer(4096);
		var len = buf.write(data.toString());
		var data_str = buf.toString('utf8', 0, len);
		console.log("data string: ", data_str);

		//idea => split the data string on '\n'. It then becomes an array.
		var data_array = data_str.split("\n");
		console.log("data array: ", data_array);
		//from the array I slice the parts I want and turn them into a string again.
		var grid = data_array.slice(0, 1).toString();
		console.log("grid: ", grid, typeof grid);
		var position = data_array.slice(1, 2).toString();
		console.log("position: ", position, typeof position);
		var instruction = data_array.slice(2).toString();
		console.log("instruction: ", instruction, typeof instruction);

		// Instantiate a new grid and a new robot from the client message instruction
		// var mars_grid = new initClass.Grid(data_str.substring(0,3));
		// console.log("Mars grid: ", mars_grid.size);
		// var martian_robot = new initClass.Robot(mars_grid.size, data_str.substring(4,11), data_str.substring(16));
		// console.log("Grid size: ", martian_robot.grid, "Robot position: ", martian_robot.position, "Robot instruction: ", martian_robot.instruction);

		var mars_grid = new initClass.Grid(grid);
		console.log("Mars grid: ", mars_grid.size);
		var martian_robot = new initClass.Robot(mars_grid.size, position, instruction);
		console.log("Grid size: ", martian_robot.grid, "Robot position: ", martian_robot.position, "Robot instruction: ", martian_robot.instruction);

		// Get the output, the robot final position on the grid
		var result = martian_robot.getOutput();
		// console.log("raw output: ", r);
		// var r_int = parseInt(r.substring(0,5), 10);
		// console.log("output w int: ", r_int);
		// var result = r_int.toString() + r.substring(5);
		sock.write('\nOutput:\n' + result);
	});
	
	// Add a 'close' event handler to this instance of socket
	sock.on('close', function(data) {
		console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
	});
	
}).listen(PORT, HOST);

//console.log('Server listening on ' + HOST +':'+ PORT);
console.log('Hi! To create a Martian robot give \nMars size,\nRobot position,\nand your instruction.');