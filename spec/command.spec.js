const Command = require('../command.js');

// Use Jest Runner extension

describe("Command class", function() {

   // TEST 1
  test("throws error if command type is NOT passed into constructor as the first parameter", function() {
    expect( function() { new Command();}).toThrow(new Error('Command type required.'));
  });

  // TEST 2 - This test checks that the constructor in the Command class correctly sets the commandType property in the new object.
  test("constructor sets name", function() {
  
    //  note that a command type will be one of the following: MODE_CHANGE, MOVE, or STATUS_CHECK
        
    const allowed_commandType =  ['MODE_CHANGE', 'MOVE', 'STATUS_CHECK'];
      
      //expect(allowed_commandType.includes(Command.commandType)).toEqual(true)
      
      const command_1 = new Command('MOVE', 4321);
        expect(allowed_commandType.includes(command_1.commandType)).toEqual(true);

      const command_2 = new Command('STATUS_CHECK');
      expect(allowed_commandType.includes(command_2.commandType)).toEqual(true);

      const command_3 = new Command('MODE_CHANGE', 'LOW_POWER');
      expect(allowed_commandType.includes(command_3.commandType)).toEqual(true);

      const command_4 = new Command('MOVE', 3579);
      expect(allowed_commandType.includes(command_4.commandType)).toEqual(true);

      const command_5 = new Command('STATUS_CHECK');
      expect(allowed_commandType.includes(command_5.commandType)).toEqual(true);

      const command_6 = new Command('MEH');
      expect(allowed_commandType.includes(command_6.commandType)).toEqual(false);       
  });


  // TEST 3 - This test checks that the constructor correctly sets the value property in the new object. You may not need to know a proper value in order to write this test.
  test("constructor sets a value passed in as the 2nd argument", function() {
    
    if (Command.commandType === 'MOVE') {
      expect(typeof Command.value === 'number').toEqual(true);
    } 
    else if (Command.commandType === 'MODE_CHANGE') {
      expect(typeof Command.value === 'string').toEqual(true);
    }
    else if (Command.commandType === 'STATUS_CHECK') {
      expect(typeof Command.value === 'undefined').toEqual(true);
    }
  });

});