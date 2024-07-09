const Rover = require('../rover.js');
const Message = require('../message.js');
const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
// However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Rover class", function() {

  // TEST 7
  describe("constructor sets position and default values for mode and generatorWatts", function() {    
    let my_rover = new Rover(9000);       
    expect(my_rover.mode().toBe('NORMAL') && my_rover.generatorWatts().toBe(110),
    );
  });
  
  // TEST 8
  describe("response returned by receiveMessage contains the name of the message", function() {
    expect(0==0);
  });

  // TEST 9
  describe("response returned by receiveMessage includes two results if two commands are sent in the message", function() {
    expect(0==0);
  });

  // TEST 10
  describe("responds correctly to the status check command", function() {
    expect(0==0);
  });

  // TEST 11
  it("responds correctly to the mode change command", function() {
    expect(0==0);
  });

  // TEST 12
  describe("responds with a false completed value when attempting to move in LOW_POWER mode", function() {
    expect(0==0);
  });

  // TEST 13
  describe("responds with the position for the move command", function() {
    expect(0==0);
  });

});