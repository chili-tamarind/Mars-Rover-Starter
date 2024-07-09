const Command = require('../command.js');

// NOTE: If at any time, you want to focus on the output from a single test, feel free to comment out all the others.
// However, do NOT edit the grading tests for any reason and make sure to un-comment out your code to get the autograder to pass.

describe("Command class", function() {

   // TEST 1
  it("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  // TEST 2 - This test checks that the constructor in the Command class correctly sets the commandType property in the new object.

  describe("constructor sets name", function() {
    
    //  note that a command type will be one of the following: MODE_CHANGE, MOVE, or STATUS_CHECK

  it("constructor in the Command class sets the commandType property", function() {
        let allowed_commandType =  ['MODE_CHANGE', 'MOVE', 'STATUS_CHECK'];

        let command_1 = new Command('MOVE', 4321);
        expect(allowed_commandType.includes(command_1.commandType)).toBe(true);

        let command_2 = new Command('STATUS_CHECK');
        expect(allowed_commandType.includes(command_2.commandType)).toBe(true);

        let command_3 = new Command('MODE_CHANGE', 'LOW_POWER');
        expect(allowed_commandType.includes(command_1.commandType)).toBe(true);

        let command_4 = new Command('MOVE', 3579);
        expect(allowed_commandType.includes(command_4.commandType)).toBe(true);

        let command_5 = new Command('STATUS_CHECK');
        expect(allowed_commandType.includes(command_5.commandType)).toBe(true);

        let command_6 = new Command('MEH');
        expect(allowed_commandType.includes(command_6.commandType)).toBe(false);
    });
});


  // TEST 3 - This test checks that the constructor correctly sets the value property in the new object. You may not need to know a proper value in order to write this test.

  describe("constructor sets a value passed in as the 2nd argument", function() {
    
    it("constructor in the Command class sets the value property", function() {

      /* use if ??????????????????????????????????????????????????????
      */
      
        let command_1 = new Command('MOVE', 4321);
        expect(typeof command_1.value === 'number');

        let command_2 = new Command('STATUS_CHECK');
        expect(typeof command_2.value === 'undefined');

        let command_3 = new Command('MODE_CHANGE', 'LOW_POWER');
        expect(typeof command_3.value === 'string');

        let command_4 = new Command('MOVE', 3579);
        expect(typeof command_4.value === 'number');

        let command_5 = new Command('STATUS_CHECK');
        expect(typeof command_5.value === 'undefined');

    });

  });

});