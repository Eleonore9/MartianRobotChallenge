//Classes to instantiate Mars grids and robots

//define a class for the grid
function Grid(size) {
	this.size = size;
}

Grid.prototype.scent_pos = new Array;

// define a class for the robots
function Robot(grid, position, instruction) {
	this.grid = grid;
	this.position = position;
	this.instruction = instruction;
	
	this.nextPosition = function(inst, pos) {
			if(inst === 'F') {
				return func.Forward(pos, this.grid);
			} else if(inst === 'L') {
				return func.Left(pos);
			} else if(inst === 'R') {
				return func.Right(pos);	
			} else {
				console.log("Oops! Robot did not understand your instruction!");
			}
	};

	this.getOutput = function() {
		var output = this.position;
		for(var i = 0; i < this.instruction.length; i++) {
			output = this.nextPosition(this.instruction[i], output);
			if(output.search("LOST") != -1){
				return output;
			}
		} 
		return output;
	};

	// this.getOutput = function() {
	// 	var output = this.position;
	// 	for(var i = 0; i < this.instruction.length; i++) {
	// 		do {
	// 			output = this.nextPosition(this.instruction[i], output);
	// 			console.log(i + " " + output);	
	// 		}while(output.search("LOST") == -1);
	// 	} 
	// 	return output;
	// };

};

//export those two classes:
exports.Grid = Grid;
exports.Robot = Robot;

//import functions from 'robotMoves.js':
var func = require('./robotMoves');

// Input = prompt("set grid size, robot position and instruction");
// var MarsGrid = new Grid(Input[0]);
// var MarsRobot = new Robot(Input.substring(1,3));
// MarsRobot.nextposition();

