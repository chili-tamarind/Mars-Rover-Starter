const Message = require('../message.js');
const Command = require('../command.js');

// Use Jest Runner extension

describe("Message class", function() { 

    // TEST 4 - This test description is “throws error if a name is NOT passed into the constructor as the first parameter”. Review the first test in command.spec.js for an example of how this test works.
    test("throws error if a name is NOT passed into the constructor as the first parameter", function() {
        expect( function() { new Message();}).toThrow(new Error('Name required.'));
    });
        
    
    // TEST 5 - The test confirms that the constructor in the Message class correctly sets the name property in a new message object.
    test("constructor sets name", function() {            
            let message_string = "Test message with two commands";
            let message_1 = new Message(message_string, my_commands = []); 
            
            expect(message_1.name).toEqual(message_string);
    });

    // TEST 6 - This test confirms that the commands property of a new message object contains the data passed in from the Message(name, commands) call.
    test("contains a commands array passed into the constructor as the 2nd argument", function() {
        
        let modeCommand = new Command('MODE_CHANGE', 'LOW_POWER');
        let moveCommand = new Command('MOVE', 12000);
        let statusCommand = new Command('STATUS_CHECK');

        let my_commands = [modeCommand, moveCommand, statusCommand];
        let message_1 = new Message('Test message with two commands', my_commands);

        expect(message_1.commands ===  my_commands)
    });

});