//Functions for each instruction 'Forward', 'Left', 'Right'.

var Forward = function(robot_position, mars_size) {
//function to be called when the instruction for the robot is to go forward
	var pos_int, new_position, mars_y, mars_x; //position as an integer, next robot position, Mars 'x' or 'y' limit
	var lost = ""; //empty string when robot on the grid
	//var scent_pos = new Array(); //array to collect the last grid positions the robot occupied before disappearing 

	switch(robot_position[4]){

		case 'N':
		console.log("position: " + robot_position);
		console.log("scent_pos: " + scent.Grid.prototype.scent_pos);
		
		//When the robot faces North it increments 'y' by 1	and returns 'LOST' when off the grid
			if(scent.Grid.prototype.scent_pos.isLost(robot_position)) {
				return robot_position;
			}else{
				pos_int = parseInt(robot_position[2], 10);
				new_position = robot_position.substring(0,2) + (pos_int + 1).toString() + robot_position.substring(3,5);
				mars_y = parseInt(mars_size[2], 10);
				if (pos_int + 1 > mars_y) {
					scent.Grid.prototype.scent_pos.push(robot_position);
					new_position = robot_position;
					lost = " LOST";
					console.log("scent_pos: " + scent.Grid.prototype.scent_pos);
				}
				console.log("scent_pos: " + scent.Grid.prototype.scent_pos);
				return new_position  + lost;
				break;

			}

			
		case 'E':
			pos_int = parseInt(robot_position[0], 10);
			new_position = (pos_int + 1).toString() + robot_position.substring(1,5);
			mars_x = parseInt(mars_size[0], 10);
			if (pos_int + 1 > mars_x) {
				scent_pos.push(robot_position);
				new_position = robot_position;
				lost = " LOST";
			}
			return new_position  + lost;
			break;

		case 'S':
			pos_int = parseInt(robot_position[2], 10);
			new_position = robot_position.substring(0,2) + (pos_int - 1).toString() + robot_position.substring(3,5);
			if (pos_int - 1 < 0) {
				scent_pos.push(robot_position);
				new_position = robot_position;
				lost = " LOST";
			}
			return new_position + lost;
			break;

		case 'W':
			pos_int = parseInt(robot_position[0], 10);
			new_position = (pos_int - 1).toString() + robot_position.substring(1,5);
			if (pos_int - 1 < 0) {
				scent_pos.push(robot_position);
				new_position = robot_position;
				lost = " LOST";
			}
			return new_position  + lost;
			break;

	default:
		console.log("I don't understand robot initial position");
	}
};

// new array method to spot the "lost scent"
// if a robot was lost, its last position is in the array scent_pos
Array.prototype.isLost = function(position) {
	for(var i = 0; i < this.length; i++) {
		if(this[i] == position) {
			return true;
		}else{
			return false;
		}
	}
}


var Left = function(robot_position) {
	//function to be called when the instruction for the robot is to turn left
	var next_position, index_pos;

	var left = ['N', 'W', 'S', 'E'];
	var index_pos = left.indexOf(robot_position[4])
	if (index_pos < 3) {
		next_position = robot_position.substring(0, 3) + " " + left[index_pos + 1];
	}else{
		next_position = robot_position.substring(0, 3) + " " + left[0];
	}return next_position
};


var Right = function(robot_position) {
	//function to be called when the instruction for the robot is to turn right
	var next_position, index_pos;

	var right = ['N', 'E', 'S', 'W'];
	var index_pos = right.indexOf(robot_position[4])
	if (index_pos < 3) {
		next_position = robot_position.substring(0, 3) + " " + right[index_pos + 1];
	}else{
		next_position = robot_position.substring(0, 3) + " " + right[0];
	}return next_position
};

//export those three functions:
exports.Forward = Forward;
exports.Left = Left;
exports.Right = Right;

//import functions from 'Mars_Robot.js':
var scent = require('./Mars_Robot');