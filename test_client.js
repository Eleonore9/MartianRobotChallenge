//TCP socket client for my server 
var net = require('net');

var HOST = '127.0.0.1';
var PORT = 6969;

var client = new net.Socket();
client.connect(PORT, HOST, function() {

	console.log('CONNECTED TO: ' + HOST + ':' + PORT);
	// Write a message to the socket as soon as the client is connected
	client.write('5 3\n1 1 E\nRFRFRFRF'); //expected output "1 1 E"
	client.end();
	client.write('5 3\n3 2 N\nFRRFLLFFRRFLL'); //expected output "3 3 N LOST"
	client.end();
	client.write('5 3\n0 3 W\nLLFFFLFLFL'); //expected output "2 3 S"
	client.end();
	client.write('60 3\n3 2 N\nFRRFLLFFRRFLL'); //expect a message for coordinate > 50
	client.end();
	client.write('5 3\n3 2 N\nFRRFLLFFRRFFRRLLRFLFRFFFFRRRFLLLRRRFFLLLRFFLLRLLRFFRRFLLFFRRFFRRLLRFLFRFFFFRRRFLLLRRRFFLLLRFFLLRLLRF'); 
	//expect a message for instruction > 100
	
	 
});

// Add a 'data' event handler for the client socket
// data is what the server sent to this socket
client.on('data', function(data) {
	
	console.log('DATA: ' + data);
	// Close the client socket completely
	client.destroy();
	
});

// Add a 'close' event handler for the client socket
client.on('close', function() {
	console.log('Connection closed');
});