var assert = require('chai').should
describe('Robot', function(){
  describe('#getOutput()', function(){
	it('should return null when the value is not present', function(){
		var robot = new Robot();
		robot.getOutput().shoud.equal(null);
	})
	it('should return None when the value is not present', function(){
		var robot = new Robot();
		robot.getOutput().shoud.equal(None);
  })
})


//----------------test (mocha, chai):
//(A)INPUT: 
//has to 1) be a string
//2) 3 lines "[num char-space-num char]\n[num char-space-num char-space-letter]\n[seq of letters]"  
//3) 2 lines "[num char-space-num char-space-letter]\n[seq of letters]"
// !!! num char <= 50, letter =[N, E, S, W], seq letter <= 100
// letters in seq letter = [F, R, L]
//(B) OUTPUT:
//has to be 1) a string
//2) 1 line "[num char-space-num char-space-letter]"
//----------------------------------


//example from Chai documentation:
var assert = require('chai').assert
  , foo = 'bar'
  , beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };

assert.typeOf(foo, 'string', 'foo is a string');
assert.equal(foo, 'bar', 'foo equal `bar`');
assert.lengthOf(foo, 3, 'foo`s value has a length of 3');
assert.lengthOf(beverages.tea, 3, 'beverages has 3 types of tea');