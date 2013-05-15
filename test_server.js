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
		sock.write('\nInput:\n' + data);

		var prepareInput = function(data) { //Prepare input from Client data
			// Turn data from the client into a string
			var buf = new Buffer(4096);
			var len = buf.write(data.toString());
			var data_str = buf.toString('utf8', 0, len);
			//split the data string on '\n'. It then becomes an array.
			var data_array = data_str.split("\n");
			return data_array;	
		};
		var gridInput = function() {
			//take part of the data array and turn it into a string
			var data_array = prepareInput(data);
			var grid = data_array.slice(0, 1).toString();
			var verif = grid.split(" ");
			if(verif[0] <= 50 && verif[1] <= 50 ){
				return grid;
			}else{
				console.log("50 is max for coordinates!");
			}	
		};
		var positionInput = function() {
			//take part of the data array and turn it into a string
			var data_array = prepareInput(data);
			var position = data_array.slice(1, 2).toString();
			var verif = position.split(" ");
			if(verif[0] <= 50 && verif[1] <= 50 ){
				return position;
			}else{
				console.log("50 is max for coordinates!");
			}			
		};
		var instructionInput = function() {
			//take part of the data array and turn it into a string
			var data_array = prepareInput(data);
			var instruction = data_array.slice(2).toString();
			if(instruction.length < 100) {
				return instruction;
			}else{
				console.log("Instruction should be shorter than 100 characters!");
			}
		};
		var Result = function() {
			//instantiate grid and robot from the input and get output
			if(gridInput() && positionInput() && instructionInput()){
				var mars_grid = new initClass.Grid(gridInput());
				var martian_robot = new initClass.Robot(mars_grid.size, positionInput(), instructionInput());
				var result = martian_robot.getOutput();
				return result;
			}
			
		}

		sock.write('\nOutput:\n' + Result());
	});
	
	// Add a 'close' event handler to this instance of socket
	sock.on('close', function(data) {
		console.log('CLOSED: ' + sock.remoteAddress +' '+ sock.remotePort);
	});
	
}).listen(PORT, HOST);

//console.log('Server listening on ' + HOST +':'+ PORT);
console.log('Hi! To create a Martian robot give \nMars size,\nRobot position,\nand your instruction.');